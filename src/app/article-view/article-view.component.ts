import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/Article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  @Input()
  article  !: Article

  constructor(private route : ActivatedRoute, private router :Router, private articleService : ArticleService) {
    const id =  parseInt(this.route.snapshot.paramMap.get('id')|| '0');
    this.articleService.getArticle(id).subscribe((article) =>{
      this.article = article;
    });
   }

  ngOnInit(): void {
  }

}
