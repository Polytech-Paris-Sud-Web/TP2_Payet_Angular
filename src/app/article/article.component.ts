import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/models/Article';
import { Author } from 'src/models/Author';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    
  @Input()
  article  !: Article
  @Input()
  author  !: Author

  @Output()
  deletedArticle : EventEmitter<number> = new EventEmitter();

  constructor(private route:Router, private authorService: AuthorService) {
    
  }

  ngOnInit(): void {
  
    this.authorService.getAuthor(this.article.author).subscribe((author) =>{
      this.author = author;
    });
  }

  deleteArticle(){
    this.deletedArticle.emit(this.article.id);
  }

  detailArticle(){
    this.route.navigate(['/article',this.article.id]);
  }

  goToAuthor(){
    this.route.navigate(['/author',this.article.author]);
  }

}
