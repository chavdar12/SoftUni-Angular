import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export enum Theme {
  Dark = 'dark',
  Light = 'light'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  currentTheme: Theme = Theme.Light;

  private _onThemeChange: Subject<Theme> = new Subject();
  // BehaviorSubject inform for the current state first
  // ReplaySubject inform for the last count
  // AsyncSubject after all stream completed

  onThemeChanged$ = this._onThemeChange.asObservable();

  constructor() {
  }

  changeTheme(newTheme: Theme) {
    this.currentTheme = newTheme;
    this._onThemeChange.next(newTheme);
  }
}
