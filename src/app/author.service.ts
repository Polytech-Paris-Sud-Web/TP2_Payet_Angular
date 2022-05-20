import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Author } from 'src/models/Author';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private preloadedAuthors : Author[] | undefined;

  constructor(private http : HttpClient) { }

  public preloadAuthors(): Observable<Author[]> {
    if (!this.preloadedAuthors) {
      return this.http.get<Author[]>(`${environment.apiUrl}/authors`).pipe(
        map(authors => {
          this.preloadedAuthors = authors;
          return authors;
        })
      );
    }
    return of(this.preloadedAuthors);
  }
  


  // public getAuthors(): Observable<Author[]> {
  //   return this.http.get<Author[]>("http://localhost:3000/authors");
  // }
  public getAuthors(): Observable<Author[]> {
    return of(this.preloadedAuthors as Author[]);
  }


  // public getAuthor(id:number){
  //   return this.http.get<Author>("http://localhost:3000/authors/" + id);
  // }
  public getAuthor(id: string): Observable<Author> {
    const defaultAuthor : Author = {
      name: 'Inconnu',
      id: "0",
      bio: 'Pas d\'information sur cet auteur',
    }
    return of(this.preloadedAuthors?.find(author => author.id === id) || defaultAuthor);
  }

  // public getAuthorByName(name:string){
  //   return this.http.get<Author>("http://localhost:3000/authors/name/" + name);
  // }
  public getAuthorByName(name: string): Observable<Author> {
    const defaultAuthor : Author = {
      name: 'Inconnu',
      id: "0",
      bio: 'Pas d\'information sur cet auteur',
    }
    return of(this.preloadedAuthors?.find(author => author.name === name) || defaultAuthor);
  }


}
