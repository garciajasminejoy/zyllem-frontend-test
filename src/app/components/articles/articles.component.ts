import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ZyllemApiService } from 'src/app/app.service';
import { Article, ArticleType } from 'src/app/model/article';
import { FeaturedArticleComponent } from './featured/featured-article.component';
import { NormalArticleComponent } from './normal/normal-article.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  @ViewChild('articlesContainer', { read: ViewContainerRef, static: true }) container;
  articleComponentRefs: ComponentRef<any>[];
  onDestroy$: Subject<void> = new Subject();

  articles: Article[] = [];
  articleTypes: string[] = ['ALL', ...Object.values(ArticleType)];
  selectedArticleTypeSubject = new BehaviorSubject<string>('ALL');

  constructor(
    private zyllemApiService: ZyllemApiService,
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ){}

  ngOnInit(): void {
      combineLatest(
        this.zyllemApiService.getArticles(),
        this.selectedArticleTypeSubject
      ).pipe(takeUntil(this.onDestroy$))
        .subscribe(([articles, selectedType]) => {
          this.articles = selectedType !== 'ALL' ?
            articles.filter(a => a.type === selectedType) :
            articles;
          this.displayArticles();
        });
  }

  ngOnDestroy(): void {
      this.articleComponentRefs.forEach(ref => ref.destroy());
      this.onDestroy$.next();
      this.onDestroy$.complete();
  }

  displayArticles(): void {
    this.container.clear();

    const refs = this.articles.map(article => {
      let factory;
      let componentRef;

      switch (article.type) {
        case ArticleType.FEATURED:
          factory = this.resolver.resolveComponentFactory(FeaturedArticleComponent);
          break;
        case ArticleType.NORMAL:
          factory = this.resolver.resolveComponentFactory(NormalArticleComponent);
          break;
      }

      componentRef = this.container.createComponent(factory);
      componentRef.instance.article = article;
      this.renderer.addClass(componentRef.location.nativeElement, 'article-card');

      return componentRef;
    });

    this.articleComponentRefs = refs;
  }

  filterArticles(value: any): void {
    this.selectedArticleTypeSubject.next(value);
  }

}
