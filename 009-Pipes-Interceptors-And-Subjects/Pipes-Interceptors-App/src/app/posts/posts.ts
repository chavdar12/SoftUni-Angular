import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLog } from '../interceptors/request-log';
import { ShortenPipe } from '../pipes/shorten.pipe';

interface Post {
  id: number;
  title: string;
}

@Component({
  selector: 'app-posts',
  imports: [AsyncPipe, ShortenPipe],
  template: `
    <h2>Interceptors</h2>
    <button (click)="load()">Load posts</button>
    <button (click)="loadBroken()">Request a missing url</button>

    <h3>Interceptor log</h3>
    <ul>
      @for (entry of log.entries(); track $index) {
        <li>{{ entry }}</li>
      }
    </ul>

    @if (posts$ | async; as posts) {
      <h3>Posts</h3>
      <ul>
        @for (post of posts; track post.id) {
          <li>{{ post.title | shorten: 40 }}</li>
        }
      </ul>
    }
  `,
})
export default class Posts {
  private readonly http = inject(HttpClient);
  protected readonly log = inject(RequestLog);
  protected posts$?: Observable<Post[]>;

  load(): void {
    this.posts$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5');
  }

  loadBroken(): void {
    this.http.get('https://jsonplaceholder.typicode.com/missing').subscribe({ error: () => {} });
  }
}
