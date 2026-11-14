import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-recent-posts',
  imports: [DatePipe, RouterLink],
  templateUrl: './recent-posts.html',
})
export class RecentPosts {
  protected readonly posts = toSignal(inject(PostService).getRecentPosts(5));
}
