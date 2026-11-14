import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsersService } from '../../core/users.service';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private readonly router = inject(Router);

  // `?search=` query param, bound as an input.
  readonly search = input('');

  protected readonly users = toSignal(inject(UsersService).getUsers(), { initialValue: [] });

  protected matches(name: string): boolean {
    return name.toLowerCase().includes(this.search().toLowerCase());
  }

  // Navigate programmatically, keeping the current child route.
  onSearch(value: string): void {
    this.router.navigate([], {
      queryParams: { search: value || null },
      queryParamsHandling: 'merge',
    });
  }
}
