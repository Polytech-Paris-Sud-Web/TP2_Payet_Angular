import { Component } from '@angular/core';
import { AuthorService } from './author.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-app';
  constructor(private authorService : AuthorService) { 
    this.authorService.preloadAuthors().subscribe(() => { });
  }
}
