import { Component, Input, OnInit } from '@angular/core';
import { FeaturedArticle } from 'src/app/model/article';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.css']
})
export class FeaturedArticleComponent implements OnInit {
  @Input() article: FeaturedArticle;

  constructor() { }

  ngOnInit() {
  }

}
