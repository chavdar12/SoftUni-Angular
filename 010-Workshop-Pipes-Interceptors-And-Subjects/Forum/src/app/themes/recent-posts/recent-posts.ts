import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { ShortenPipe } from '../../shared/pipes/shorten.pipe';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-recent-posts',
  imports: [RouterLink, ShortenPipe, TimeAgoPipe],
  templateUrl: './recent-posts.html',
})
export class RecentPosts {
  protected readonly posts = toSignal(inject(PostService).getRecentPosts(5));
}
