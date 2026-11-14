import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../core/services/theme.service';
import { ThemeListItem } from '../theme-list-item/theme-list-item';

@Component({
  selector: 'app-theme-list',
  imports: [ThemeListItem],
  templateUrl: './theme-list.html',
})
export class ThemeList {
  protected readonly themes = toSignal(inject(ThemeService).getThemes());
}
