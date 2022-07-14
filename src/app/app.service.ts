import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleType } from './model/article';

export interface ArticleUiModel {
  id: string;
  title: string;
  author: string;
  content?: string;
  publishedAt: string;
  articleUrl: string;
  articleType: ArticleType;
}

@Injectable()
export class ZyllemApiService {
    articlesSubject = new BehaviorSubject<ArticleUiModel[]>([]);

    constructor(private httpClient: HttpClient) {}

    initArticles(): void {
      this.httpClient.get<any>('https://newsdata.io/api/1/news', {
        params: {
          apikey: 'pub_91779ebe0ae64c697410c7bfa6d45a07a489',
          q: 'philippines',
          country: 'ph',
          language: 'en'
        }
      }).subscribe(({results}) => {
        const transformedResults = results.map((article, index) => this.transformArticleModelToUiModel(article, index));
        const sortedTransformedData = transformedResults.sort(x => x.articleType === ArticleType.FEATURED ? -1 : 1);
        this.articlesSubject.next(sortedTransformedData);
      });
    }

    getArticles(): Observable<ArticleUiModel[]> {
        return this.articlesSubject.asObservable();
    }

    getArticlesById$(id: string): Observable<ArticleUiModel> {
      return this.articlesSubject.pipe(
        map(articles => articles.find(a => a.id === id))
      );
    }

    private transformArticleModelToUiModel(article: any, index: number): ArticleUiModel {
      let transformedArticle: ArticleUiModel = {
        id: `${index + 1}`,
        title: article.title,
        author: !!article.creator ? article.creator.join(', ') : '',
        publishedAt: new Date(article.pubDate).toISOString(),
        articleUrl: article.link,
        articleType: (index + 1)%2 == 0 ? ArticleType.FEATURED : ArticleType.NORMAL,
      };

      if (transformedArticle.articleType === ArticleType.FEATURED) {
        transformedArticle.content = article.image_url || 'assets/images/news.png';
      } else {
        transformedArticle.content = article.description;
      }

      return transformedArticle;
    }
}
