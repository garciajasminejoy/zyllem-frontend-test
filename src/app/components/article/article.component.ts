import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZyllemApiService } from 'src/app/app.service';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;

  constructor(
    private zyllemApiService: ZyllemApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.article = this.zyllemApiService.getArticlesById(this.activatedRoute.snapshot.params.id);
  }

}
