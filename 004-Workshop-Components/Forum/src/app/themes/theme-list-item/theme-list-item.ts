import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Theme } from '../../models/theme';

@Component({
  selector: 'app-theme-list-item',
  imports: [DatePipe],
  templateUrl: './theme-list-item.html',
})
export class ThemeListItem {
  readonly theme = input.required<Theme>();
}
