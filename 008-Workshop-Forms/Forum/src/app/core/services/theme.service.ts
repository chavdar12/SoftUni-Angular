import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Theme, ThemeDetails } from '../../models/theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly http = inject(HttpClient);

  getThemes(): Observable<Theme[]> {
    return this.http
      .get<Theme[]>('/api/themes')
      .pipe(map((themes) => themes.sort((a, b) => b.subscribers.length - a.subscribers.length)));
  }

  getTheme(themeId: string): Observable<ThemeDetails> {
    return this.http.get<ThemeDetails>(`/api/themes/${themeId}`);
  }

  createTheme(themeName: string, postText: string): Observable<Theme> {
    return this.http.post<Theme>('/api/themes', { themeName, postText });
  }
}
