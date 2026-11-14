import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Welcome } from '../../shared/welcome/welcome';
import { RecentPosts } from '../recent-posts/recent-posts';
import { ThemeList } from '../theme-list/theme-list';

@Component({
  selector: 'app-themes-page',
  imports: [Welcome, ThemeList, RecentPosts],
  templateUrl: './themes-page.html',
})
export default class ThemesPage {
  protected readonly user = inject(UserService);
}
