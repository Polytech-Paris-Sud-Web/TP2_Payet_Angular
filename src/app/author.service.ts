import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/models/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http : HttpClient) { }
  
  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>("http://localhost:3000/authors");
  }

  public getAuthor(id:number){
    return this.http.get<Author>("http://localhost:3000/authors/" + id);
  }
  public getAuthorByName(name:string){
    return this.http.get<Author>("http://localhost:3000/authors/name/" + name);
  }

}
