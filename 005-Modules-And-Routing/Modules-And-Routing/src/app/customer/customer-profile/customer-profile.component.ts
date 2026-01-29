import {Component, OnInit} from '@angular/core';
import {CustomerService, IUser} from "../customer.setvice";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  id: number = 0;
  customer!: IUser;
  isLoading: boolean = false;

  constructor(private activateRoute: ActivatedRoute,
              private customerService: CustomerService,
              private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        tap(params => {
          this.id = +params['id'];
          // + parse to number
          // this.id = +this.activateRoute.snapshot.params['id'];
          // const id = this.activateRoute.snapshot.paramMap.get('id');

          this.titleService.setTitle('Profile ' + this.id);
          this.isLoading = true;
        }),
        switchMap(params => {
          return this.customerService.getUserById$(params['id']);
        })
      )
      .subscribe({
        next: user => {
          this.customer = user;
          this.isLoading = false;
        },
        error: error => {
          this.isLoading = false;
          console.error('Error happened', error);
        }
      })
  }
}
