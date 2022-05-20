import { Component, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../../models/Article';
import { RawArticle } from 'src/models/RawArticle';

@Component({
  selector: 'app-last-articles',
  templateUrl: './last-articles.component.html',
  styleUrls: ['./last-articles.component.css']
})
export class LastArticlesComponent implements OnInit {

    @Input()
    articles!: Article[];
    


    constructor(private articleService: ArticleService) {
      this.ngOnInit();
    }

    ngOnInit() {
      this.articleService.getLastTenArticles().subscribe(value => this.articles = value);
    }

    deleteArticle(id: string) {
      this.articleService.deleteArticle(id).subscribe(
        () => this.articleService.getArticles().subscribe(value => this.articles = value));
    }

    getArticle(id:string){
      return this.articleService.getArticle(id);
    }

    addArticle(raw: RawArticle) {
      this.articleService.getArticles().subscribe(value => this.articles = value);
    }
    
    searchArticles(e:Event) {
      const search = (<HTMLInputElement>e.target).value;
      this.articleService.searchArticles(search).subscribe(value => this.articles = value);
    }
}
