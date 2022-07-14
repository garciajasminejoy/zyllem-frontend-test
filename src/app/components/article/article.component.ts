import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ArticleUiModel, ZyllemApiService } from 'src/app/app.service';
import { ArticleType } from 'src/app/model/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  title: string;
  author: string;
  content: string;
  articleUrl: string;
  articleType: ArticleType;

  onDestroy$ = new Subject();

  constructor(
    private zyllemApiService: ZyllemApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.zyllemApiService.getArticlesById$(this.activatedRoute.snapshot.params.id)
      .pipe(
        takeUntil(this.onDestroy$),
        filter<ArticleUiModel>(Boolean)
      )
      .subscribe(article => {
        this.title = article.title;
        this.author = article.author;
        this.content = article.content;
        this.articleType = article.articleType;
        this.articleUrl = article.articleUrl;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
