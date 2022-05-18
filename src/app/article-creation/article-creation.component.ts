import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { RawArticle } from '../../models/RawArticle';
import { ArticleService } from '../article.service';
import { Article } from 'src/models/Article';
import { Router } from '@angular/router';
import { AuthorService } from '../author.service';
import { Author } from 'src/models/Author';


@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {


  articleForm : FormGroup;
  authors !: Author[];
  selectedAuthor ?: Author;

  @Output()
  newArticle : EventEmitter<Article> = new EventEmitter();

  constructor(private fb: FormBuilder, private articleService: ArticleService, private authorService : AuthorService ,private route:Router) {
    this.articleForm = this.fb.group({
      title: ['Fake Title', Validators.required ],
      content : ['', Validators.required ],
      author : [this.selectedAuthor, Validators.required ],
    });
    authorService.getAuthors().subscribe((authors) => this.authors = authors);
  }

  ngOnInit(): void {
    
  }

  createArticle() {
    const formModel = this.articleForm.value;
    const newArticle : RawArticle = {
      title : formModel.title,
      content: formModel.content,
      author : formModel.author
    };
    this.articleService.addArticle(newArticle).subscribe((article) => this.newArticle.emit(article));
    this.route.navigate(['/articles']);
  }

  update(e :Event){
    this.selectedAuthor = this.articleForm.value.author;
  }

}
