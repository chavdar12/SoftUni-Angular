import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from '../../core/services/post.service';
import { ThemeService } from '../../core/services/theme.service';
import { UserService } from '../../core/services/user.service';
import { ThemeDetails } from '../../models/theme';
import { ForumDatePipe } from '../../shared/pipes/forum-date.pipe';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { Welcome } from '../../shared/welcome/welcome';

@Component({
  selector: 'app-theme-detail',
  imports: [FormsModule, ForumDatePipe, TimeAgoPipe, Welcome],
  templateUrl: './theme-detail.html',
  styleUrl: './theme-detail.css',
})
export default class ThemeDetail {
  // Bound from the `:themeId` route param (withComponentInputBinding).
  readonly themeId = input.required<string>();

  protected readonly user = inject(UserService);
  private readonly themeService = inject(ThemeService);
  private readonly postService = inject(PostService);

  // Re-fetches automatically whenever themeId changes; `reload()` after every change.
  protected readonly theme = httpResource<ThemeDetails>(() => `/api/themes/${this.themeId()}`);

  protected readonly isSubscribed = computed(() => {
    const userId = this.user.currentUser()?._id;
    return !!userId && !!this.theme.value()?.subscribers.includes(userId);
  });

  protected hasLiked(likes: string[]): boolean {
    const userId = this.user.currentUser()?._id;
    return !!userId && likes.includes(userId);
  }

  toggleSubscription(): void {
    const request = this.isSubscribed()
      ? this.themeService.unsubscribe(this.themeId())
      : this.themeService.subscribe(this.themeId());
    request.subscribe(() => this.theme.reload());
  }

  like(postId: string): void {
    this.postService.like(postId).subscribe(() => this.theme.reload());
  }

  comment(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.themeService.comment(this.themeId(), form.value.postText).subscribe(() => {
      form.resetForm();
      this.theme.reload();
    });
  }
}
