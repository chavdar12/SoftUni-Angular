import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from 'src/app/service/auth.service';
import {ITheme} from '../../../core/interfaces';

@Component({
  selector: 'app-theme-list-item',
  templateUrl: './theme-list-item.component.html',
  styleUrls: ['./theme-list-item.component.css']
})
export class ThemeListItemComponent implements OnChanges {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  canSubscribe: boolean = false;

  @Input() theme: ITheme;

  constructor(private authService: AuthService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // TODO: user currentUser$
    this.canSubscribe = !this.theme.subscribers.includes('5fa64b162183ce1728ff371d');
  }

}
