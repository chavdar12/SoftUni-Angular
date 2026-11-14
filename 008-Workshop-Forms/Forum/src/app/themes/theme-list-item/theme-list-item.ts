import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Theme } from '../../models/theme';

@Component({
  selector: 'app-theme-list-item',
  imports: [DatePipe, RouterLink],
  templateUrl: './theme-list-item.html',
})
export class ThemeListItem {
  readonly theme = input.required<Theme>();

  protected readonly user = inject(UserService);
  protected readonly isSubscribed = computed(() => {
    const userId = this.user.currentUser()?._id;
    return !!userId && this.theme().subscribers.includes(userId);
  });
}
