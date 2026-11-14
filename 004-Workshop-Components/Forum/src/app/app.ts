import { Component } from '@angular/core';
import { Footer } from './core/footer/footer';
import { Header } from './core/header/header';
import { RecentPosts } from './themes/recent-posts/recent-posts';
import { ThemeList } from './themes/theme-list/theme-list';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, ThemeList, RecentPosts],
  templateUrl: './app.html',
})
export class App {}
