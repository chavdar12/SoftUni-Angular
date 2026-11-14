import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { InputErrorDirective } from '../../shared/directives/input-error.directive';
import { FormStatus } from '../../shared/form-status/form-status';

@Component({
  selector: 'app-new-theme',
  imports: [FormsModule, InputErrorDirective, FormStatus],
  templateUrl: './new-theme.html',
  styleUrl: './new-theme.css',
})
export class NewTheme {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  protected readonly error = signal<string | null>(null);

  createTheme(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { themeName, postText } = form.value;
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
