import { Component, computed, input, signal } from '@angular/core';
import { Article as ArticleModel } from '../models/article.model';

const SYMBOLS_PER_CLICK = 250;

@Component({
  selector: 'app-article',
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article {
  readonly article = input.required<ArticleModel>();
  readonly articleDesc = input.required<string>();

  protected readonly articleDescLen = signal(0);
  protected readonly imageIsShown = signal(false);

  protected readonly descToShow = computed(() =>
    this.articleDesc().substring(0, this.articleDescLen()),
  );
  protected readonly showReadMoreBtn = computed(
    () => this.articleDescLen() < this.articleDesc().length,
  );
  protected readonly showHideBtn = computed(() => !this.showReadMoreBtn());
  protected readonly imageButtonTitle = computed(() =>
    this.imageIsShown() ? 'Hide Image' : 'Show Image',
  );

  readMore(): void {
    this.articleDescLen.update((len) =>
      Math.min(len + SYMBOLS_PER_CLICK, this.articleDesc().length),
    );
  }

  hideDesc(): void {
    this.articleDescLen.set(0);
  }

  toggleImage(): void {
    this.imageIsShown.update((shown) => !shown);
  }
}
