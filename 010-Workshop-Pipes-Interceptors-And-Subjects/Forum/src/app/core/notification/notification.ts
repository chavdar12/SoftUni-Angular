import { Component, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  template: `
    @if (notifications.current(); as notification) {
      <p
        class="notification"
        [class.error-message]="notification.type === 'error'"
        [class.success-message]="notification.type === 'success'"
      >
        {{ notification.text }}
      </p>
    }
  `,
  styleUrl: './notification.css',
})
export class Notification {
  protected readonly notifications = inject(NotificationService);
}
