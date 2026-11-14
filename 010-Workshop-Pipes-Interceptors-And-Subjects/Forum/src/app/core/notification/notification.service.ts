import { Injectable, signal } from '@angular/core';

export interface Notification {
  text: string;
  type: 'error' | 'success';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly current = signal<Notification | null>(null);
  private timeoutId?: ReturnType<typeof setTimeout>;

  showError(text: string): void {
    this.show({ text, type: 'error' });
  }

  showSuccess(text: string): void {
    this.show({ text, type: 'success' });
  }

  private show(notification: Notification): void {
    clearTimeout(this.timeoutId);
    this.current.set(notification);
    this.timeoutId = setTimeout(() => this.current.set(null), 4000);
  }
}
