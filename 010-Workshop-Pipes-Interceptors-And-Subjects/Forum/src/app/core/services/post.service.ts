import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);

  getRecentPosts(limit = 5): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts', { params: { limit } });
  }

  like(postId: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`/api/likes/${postId}`, {});
  }
}
