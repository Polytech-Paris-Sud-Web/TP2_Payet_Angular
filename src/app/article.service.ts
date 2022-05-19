import { Injectable } from '@angular/core';
import { Article } from '../models/Article';

import {HttpClient} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RawArticle } from 'src/models/RawArticle';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private preloadedArticles : Article[] | undefined;

  constructor(private http : HttpClient) { }

  public preloadArticles(): Observable<Article[]> {
    if (!this.preloadedArticles) {
      return this.http.get<Article[]>(`${environment.apiUrl}/authors`).pipe(
        map(authors => {
          this.preloadedArticles = authors;
          return authors;
        })
      );
    }
    return of(this.preloadedArticles);
  }


  // public getArticles(): Observable<Article[]> {
  //   return this.http.get<Article[]>("http://localhost:3000/articles");
  // }
  public getArticles(): Observable<Article[]> {
    return of(this.preloadedArticles as Article[]);
  }
  public getLastTenArticles() : Observable<Article[]> {
    return this.getArticles().pipe(
      map(articles => articles.slice(0, 10))
    );
  }

  public deleteArticle(id:number){
    return this.http.delete("http://localhost:3000/articles/" + id);
  }

  public addArticle(raw: RawArticle) {
    return this.http.post<Article>("http://localhost:3000/articles", raw);
  }

  public getArticle(id: number) {
    const defaultArticle : Article = {
      id: 0,
      title: 'Inconnu',
      content: 'Inconnu',
      author: 0,
    }
    return of(this.preloadedArticles?.find(article => article.id === id) || defaultArticle);
  }

  public searchArticles(s :string) {
    return this.getArticles().pipe(
      map(articles => articles.filter(
        article => article.title.includes(s) 
        || article.content.includes(s) ))
    );
  }


  // public getArticles() : Article[] {
  //   return [{
  //     title: 'My First Article',
  //     content: 'Hello World',
  //     author: 'Orangefire'
  //   }, {
  //     title: 'Angular component',
  //     content: 'Angular component looks awesome!',
  //     author: 'Orangefire'
  //   }, {
  //     title: 'Angular service',
  //     content: 'I read something about angular service, i will try it soon',
  //     author: 'Orangefire'
  //   }];
//} 
}
