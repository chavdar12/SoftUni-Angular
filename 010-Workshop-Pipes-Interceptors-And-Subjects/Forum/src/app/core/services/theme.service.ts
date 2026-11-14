import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Theme } from '../../models/theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly http = inject(HttpClient);

  getThemes(): Observable<Theme[]> {
    return this.http
      .get<Theme[]>('/api/themes')
      .pipe(map((themes) => themes.sort((a, b) => b.subscribers.length - a.subscribers.length)));
  }

  createTheme(themeName: string, postText: string): Observable<Theme> {
    return this.http.post<Theme>('/api/themes', { themeName, postText });
  }

  comment(themeId: string, postText: string): Observable<Theme> {
    return this.http.post<Theme>(`/api/themes/${themeId}`, { postText });
  }

  subscribe(themeId: string): Observable<Theme> {
    return this.http.put<Theme>(`/api/themes/${themeId}`, {});
  }

  unsubscribe(themeId: string): Observable<Theme> {
    return this.http.delete<Theme>(`/api/themes/${themeId}/subscribers`);
  }
}
