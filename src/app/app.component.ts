import { Component, OnInit } from '@angular/core';
import { ZyllemApiService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: ZyllemApiService){}

  ngOnInit(): void {
      this.service.initArticles();
  }
}
