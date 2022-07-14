import { Component, Input, OnInit } from '@angular/core';
import { ArticleUiModel } from 'src/app/app.service';

@Component({
  selector: 'app-normal-article',
  templateUrl: './normal-article.component.html',
  styleUrls: ['./normal-article.component.css']
})
export class NormalArticleComponent implements OnInit {
  @Input() article: ArticleUiModel;

  constructor() { }

  ngOnInit() {
  }

}
