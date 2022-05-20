import { Component, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../../models/Article';
import { Observable } from 'rxjs';
import { RawArticle } from 'src/models/RawArticle';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

//   articles(): Article[] {
//     return this.articleService.getArticles();
// }
//   constructor(private articleService: ArticleService) {
//   }

//   ngOnInit(): void {
//   }

    //articles!: Observable<Article[]>;
    @Input()
    articles!: Article[];
    


    constructor(private articleService: ArticleService) {
      this.ngOnInit();
    }

    ngOnInit() {
      //this.articles = this.articleService.getArticles();
      this.articleService.getArticles().subscribe(value => this.articles = value);
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