import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Post } from '../models/post';
import { LoggingService } from './logging.service';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// A service injected into another service.
@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly logger = inject(LoggingService);

  getAllPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(API_URL)
      .pipe(tap((posts) => this.logger.log(`Fetched ${posts.length} posts`)));
  }
}
