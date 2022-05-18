import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/models/Author';
import { ArticleService } from '../article.service';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.css']
})
export class AuthorViewComponent implements OnInit {

  @Input()
  author !: Author 

  constructor(private route : ActivatedRoute, private router :Router, private authorService : AuthorService) {
    const id =  parseInt(this.route.snapshot.paramMap.get('id')|| '0');
    this.authorService.getAuthor(id).subscribe((author) =>{
      this.author = author;
    });
   }

  ngOnInit(): void {
  }

}
