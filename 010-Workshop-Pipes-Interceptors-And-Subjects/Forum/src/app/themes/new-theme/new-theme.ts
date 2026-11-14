import { Component, inject } from '@angular/core';
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
export default class NewTheme {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  createTheme(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { themeName, postText } = form.value;
    this.themeService
      .createTheme(themeName, postText)
      .subscribe((theme) => this.router.navigate(['/themes', theme._id]));
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
