import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from 'src/app/service/auth.service';
import {IPost, ITheme} from 'src/app/core/interfaces';
import {ThemeService} from 'src/app/core/theme.service';

@Component({
  selector: 'app-themes-detail-page',
  templateUrl: './themes-detail-page.component.html',
  styleUrls: ['./themes-detail-page.component.css']
})
export class ThemesDetailPageComponent implements OnInit {

  theme: ITheme;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  canSubscribe: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private themeService: ThemeService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    // get param once!
    // const themeId = this.activatedRoute.snapshot.params['themeId'];
    // this.themeService.loadThemeById(themeId).subscribe(theme => {
    //   this.theme = theme;
    // });

    // get changed param in url
    this.activatedRoute.params.subscribe(params => {
      const themeId = params['themeId'];
      this.themeService.loadThemeById(themeId).subscribe(theme => {
        this.theme = theme;
        this.canSubscribe = !this.theme.subscribers.includes('5fa64b162183ce1728ff371d');
      })
    })
  }

  canLike(comment: IPost) {
    return !comment.likes.includes('5fa64b162183ce1728ff371d');
  }

}
