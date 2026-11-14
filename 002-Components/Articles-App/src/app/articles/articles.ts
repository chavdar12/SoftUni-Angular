import { Component, OnInit } from '@angular/core';
import { ArticleData } from '../data/data';
import { Article as ArticleModel } from '../models/article.model';
import { Article } from '../article/article';

@Component({
  selector: 'app-articles',
  imports: [Article],
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class Articles implements OnInit {
  protected articles: ArticleModel[] = [];

  ngOnInit(): void {
    // Instantiated directly on purpose - DI is introduced in the next lesson.
    this.articles = new ArticleData().getData();
  }
}
