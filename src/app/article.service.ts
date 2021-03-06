import { Injectable } from '@angular/core';
import { Article } from '../models/Article';

import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from 'rxjs';
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
      return this.http.get<Article[]>(`${environment.apiUrl}/articles`).pipe(
        map(articles => {
          this.preloadedArticles = articles;
          return articles;
        })
      );
    }
    return of(this.preloadedArticles);
  }

  public getArticles(): Observable<Article[]> {
    return this.preloadedArticles ? of(this.preloadedArticles) : this.http.get<Article[]>(`${environment.apiUrl}/articles`);
  }
  public getLastTenArticles() : Observable<Article[]> {
    return this.getArticles().pipe(
      map(articles => articles.slice(0, 10))
    );
  }

  public deleteArticle(id:string){
    return this.http.delete(`${environment.apiUrl}/articles`+ id);
  }

  public addArticle(raw: RawArticle) {
    return this.http.post<Article>(`${environment.apiUrl}/articles`, raw);
  }

  public getArticle(id: string): Observable<Article> {
    const defaultArticle : Article = {
      id: '0',
      title: 'Inconnu',
      content: 'Inconnu',
      author: "0",
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

}


