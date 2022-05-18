import { Injectable } from '@angular/core';
import { Article } from '../models/Article';

import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { RawArticle } from 'src/models/RawArticle';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http : HttpClient) { }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles");
  }
  public getLastTenArticles() : Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles?_limit=10");
  }

  public deleteArticle(id:number){
    return this.http.delete("http://localhost:3000/articles/" + id);
  }

  public addArticle(raw: RawArticle) {
    return this.http.post<Article>("http://localhost:3000/articles", raw);
  }

  public getArticle(id:number){
    return this.http.get<Article>("http://localhost:3000/articles/" + id);
  }

  public searchArticles(s :String) {
    return this.http.get<Article[]>("http://localhost:3000/articles?q=" + s);
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
