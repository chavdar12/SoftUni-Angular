import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { GmailValidatorDirective } from '../../shared/directives/gmail-validator.directive';
import { InputErrorDirective } from '../../shared/directives/input-error.directive';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, GmailValidatorDirective, InputErrorDirective],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  protected readonly user = inject(UserService);
  protected readonly editMode = signal(false);

  save(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { username, email, tel } = form.value;
    this.user.updateProfile({ username, email, tel });
    this.editMode.set(false);
  }

  // Nothing is written until Save, so cancelling just leaves edit mode - all changes are reverted.
  cancel(): void {
    this.editMode.set(false);
  }
}
