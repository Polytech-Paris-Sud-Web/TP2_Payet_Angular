import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/models/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    
  @Input()
  article  !: Article
  @Output()
  deletedArticle : EventEmitter<number> = new EventEmitter();

  constructor(private route:Router){
  }

  ngOnInit(): void {
  }

  deleteArticle(){
    this.deletedArticle.emit(this.article.id);
  }

  detailArticle(){
    this.route.navigate(['/article',this.article.id]);
  }

}
