import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article, ArticleType } from './model/article';

@Injectable()
export class ZyllemApiService {
    articlesSubject = new BehaviorSubject<Article[]>([]);

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
        const transformedResults = results.map((article, i) => {
          let transformedArticle: any = {
            id: `${i + 1}`,
            title: article.title,
            author: !!article.creator ? article.creator.join(', ') : '',
            publishedAt: new Date(article.pubDate).toISOString(),
            url: article.link,
            type: i%2===0 ? ArticleType.FEATURED : ArticleType.NORMAL,
          };

          if (i % 2 === 0) {
            transformedArticle.featureImgUrl = article.image_url || 'assets/images/news.png';
          } else {
            transformedArticle.description = article.description;
          }

          return transformedArticle;
        });
        const sortedTransformedData = transformedResults.sort(x => x.type === ArticleType.FEATURED ? -1 : 1);
        this.articlesSubject.next(sortedTransformedData);
      });
    }

    getArticles(): Observable<Article[]> {
        return this.articlesSubject.asObservable();
    }

    getArticlesById(id: string): Article {
      return this.articlesSubject.getValue().find(article => article.id === id);
    }
}
