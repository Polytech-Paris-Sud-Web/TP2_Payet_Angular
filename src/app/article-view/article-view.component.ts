import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/Article';
import { Author } from 'src/models/Author';
import { ArticleService } from '../article.service';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  //@Input()
  article  : Article = { id: 0, title: '', content: '', author: 0 };
  //@Input()
  author : Author = { id: 0, name: '', bio:''};



  constructor(private route : ActivatedRoute, private router :Router, private articleService : ArticleService, private authorService : AuthorService) {
    const id =  parseInt(this.route.snapshot.paramMap.get('id')|| '0');
    this.articleService.getArticle(id).subscribe((article) =>{
      this.article = article;
      console.log(article);
      this.authorService.getAuthor(article.author).subscribe((author) =>{
        this.author = author;
      });
    });
   }

  ngOnInit(): void {
  }

}
