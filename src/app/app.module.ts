import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZyllemApiService } from './app.service';
import { ArticleComponent } from './components/article/article.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { FeaturedArticleComponent } from './components/articles/featured/featured-article.component';
import { NormalArticleComponent } from './components/articles/normal/normal-article.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturedArticleComponent,
    NormalArticleComponent,
    ArticlesComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  entryComponents: [
    FeaturedArticleComponent,
    NormalArticleComponent,
  ],
  providers: [ZyllemApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
