import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer/footer';
import { Header } from './core/header/header';
import { Notification } from './core/notification/notification';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Notification, RouterOutlet],
  templateUrl: './app.html',
})
export class App {}
