import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { UserService } from '../../core/services/user.service';
import { Theme } from '../../models/theme';
import { ForumDatePipe } from '../../shared/pipes/forum-date.pipe';
import { ShortenPipe } from '../../shared/pipes/shorten.pipe';

@Component({
  selector: 'app-theme-list-item',
  imports: [RouterLink, ShortenPipe, ForumDatePipe],
  templateUrl: './theme-list-item.html',
})
export class ThemeListItem {
  readonly theme = input.required<Theme>();

  protected readonly user = inject(UserService);
  private readonly themeService = inject(ThemeService);

  // Local copy of the theme, replaced with the API response after (un)subscribing.
  protected readonly current = linkedSignal(() => this.theme());
  protected readonly isSubscribed = computed(() => {
    const userId = this.user.currentUser()?._id;
    return !!userId && this.current().subscribers.includes(userId);
  });

  toggleSubscription(): void {
    const id = this.current()._id;
    const request = this.isSubscribed()
      ? this.themeService.unsubscribe(id)
      : this.themeService.subscribe(id);
    request.subscribe((theme) =>
      this.current.update((t) => ({ ...t, subscribers: theme.subscribers })),
    );
  }
}
