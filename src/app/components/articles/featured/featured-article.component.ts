import { Component, Input, OnInit } from '@angular/core';
import { ArticleUiModel } from 'src/app/app.service';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.css']
})
export class FeaturedArticleComponent implements OnInit {
  @Input() article: ArticleUiModel;

  constructor() { }

  ngOnInit() {
  }

}
