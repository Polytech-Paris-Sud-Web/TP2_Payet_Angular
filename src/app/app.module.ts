import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import {ArticleService} from "./article.service";
import { ArticleCreationComponent } from './article-creation/article-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ArticleViewComponent } from './article-view/article-view.component';
import { AuthorViewComponent } from './author-view/author-view.component';
import { LastArticlesComponent } from './last-articles/last-articles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: 'create', component: ArticleCreationComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'last', component: LastArticlesComponent },
  { path: 'article/:id', component: ArticleViewComponent },
  { path: 'author/:id', component: AuthorViewComponent },
  { path: '', component: ArticlesComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticlesComponent,
    ArticleCreationComponent,
    ArticleViewComponent,
    AuthorViewComponent,
    LastArticlesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
