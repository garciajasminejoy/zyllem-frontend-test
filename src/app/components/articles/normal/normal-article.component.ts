import { Component, Input, OnInit } from '@angular/core';
import { NormalArticle } from 'src/app/model/article';

@Component({
  selector: 'app-normal-article',
  templateUrl: './normal-article.component.html',
  styleUrls: ['./normal-article.component.css']
})
export class NormalArticleComponent implements OnInit {
  @Input() article: NormalArticle;

  constructor() { }

  ngOnInit() {
  }

}
