import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ThemeService } from '../../core/services/theme.service';
import { UserService } from '../../core/services/user.service';
import { Welcome } from '../../shared/welcome/welcome';

@Component({
  selector: 'app-theme-detail',
  imports: [DatePipe, Welcome],
  templateUrl: './theme-detail.html',
  styleUrl: './theme-detail.css',
})
export class ThemeDetail {
  // Bound from the `:themeId` route param (withComponentInputBinding).
  readonly themeId = input.required<string>();

  protected readonly user = inject(UserService);
  private readonly themeService = inject(ThemeService);

  protected readonly theme = toSignal(
    toObservable(this.themeId).pipe(switchMap((id) => this.themeService.getTheme(id))),
  );

  protected readonly isSubscribed = computed(() => {
    const userId = this.user.currentUser()?._id;
    return !!userId && !!this.theme()?.subscribers.includes(userId);
  });

  protected hasLiked(likes: string[]): boolean {
    const userId = this.user.currentUser()?._id;
    return !!userId && likes.includes(userId);
  }
}
