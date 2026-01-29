import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../customer.service';

@Component({
  selector: 'app-customer-list-item',
  templateUrl: './customer-list-item.component.html',
  styleUrls: ['./customer-list-item.component.css']
})
export class CustomerListItemComponent implements OnInit {
  date = new Date();

  @Input() item!: IUser;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      // console.log('Special customer');
      // don't work because of memorization by reference:
      // this.item.email: 'special-customer-email@abg.bg';
      // solution destroy and write:
      this.item = {
        ...this.item,
        email: 'special-customer-email@abg.bg'
      }

      // or set pipe -> pure: false (this remove memorization)
    }, 2000)
  }

}
