import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ArticleComponent } from "./components/article/article.component";
import { ArticlesComponent } from "./components/articles/articles.component";

const routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full'
  },
  {
    path: 'articles',
    component: ArticlesComponent
  },
  {
    path: 'articles/:id',
    component: ArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
