import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {filter, startWith, switchMap, tap} from 'rxjs/operators';
import {ITheme} from '../../../core/interfaces';
import {ThemeService} from '../../../core/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit, AfterViewInit {

  themeList: ITheme[];

  searchControl = new FormControl('');

  // new FormControl('', { updateOn: 'change' | 'blur' | 'submit' });

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      // debounceTime(500), // use with mergeMap
      filter(searchTerm => searchTerm.length > 3), // search for more than 3 characters
      startWith(''),
      tap(searchTerm => console.log(searchTerm)),
      switchMap(searchTerm => this.themeService.loadThemeList(searchTerm))
      // mergeMap => return the result from the observable
      // switchMap => stop previous requests and takes the last
    )
      .subscribe(themeList => {
        this.themeList = themeList;
      });
  }


  ngAfterViewInit(): void {
    console.log('View was initialized');
  }

}
