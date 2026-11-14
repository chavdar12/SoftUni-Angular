import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  protected readonly user = inject(UserService);
}
