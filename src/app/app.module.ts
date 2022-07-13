import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ZyllemApiService } from './app.service';
import { ArticlesComponent } from './components/articles/articles.component';
import { FeaturedArticleComponent } from './components/articles/featured/featured-article.component';
import { NormalArticleComponent } from './components/articles/normal/normal-article.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturedArticleComponent,
    NormalArticleComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [ZyllemApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
