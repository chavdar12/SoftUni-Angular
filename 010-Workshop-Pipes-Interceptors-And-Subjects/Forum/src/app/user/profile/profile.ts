import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationService } from '../../core/notification/notification.service';
import { UserService } from '../../core/services/user.service';
import { GmailValidatorDirective } from '../../shared/directives/gmail-validator.directive';
import { InputErrorDirective } from '../../shared/directives/input-error.directive';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, GmailValidatorDirective, InputErrorDirective],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export default class Profile {
  protected readonly user = inject(UserService);
  private readonly notifications = inject(NotificationService);
  protected readonly editMode = signal(false);

  save(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { username, email, tel } = form.value;
    this.user.updateProfile({ username, email, tel }).subscribe(() => {
      this.notifications.showSuccess('Profile updated.');
      this.editMode.set(false);
    });
  }

  // Nothing is written until Save, so cancelling just leaves edit mode - all changes are reverted.
  cancel(): void {
    this.editMode.set(false);
  }
}
