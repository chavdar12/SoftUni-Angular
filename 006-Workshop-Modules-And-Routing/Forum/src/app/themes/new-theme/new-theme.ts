import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.html',
  styleUrl: './new-theme.css',
})
export class NewTheme {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  protected readonly error = signal<string | null>(null);

  // Forms are not covered yet - values come from template reference variables.
  createTheme(event: Event, themeName: string, postText: string): void {
    event.preventDefault();
    this.themeService.createTheme(themeName, postText).subscribe({
      next: (theme) => this.router.navigate(['/themes', theme._id]),
      // Expected until real authentication exists (Part 4) - the API answers 401.
      error: (err) => this.error.set(err.error?.message ?? err.message),
    });
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
