import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;

  private subscription: Subscription = new Subscription();
  // or:
  // private subscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // console.log('ngOnInit#preSubscription');
    this.subscription.add(
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        // console.log('isLoggedIn', isLoggedIn);
        this.isLoggedIn = isLoggedIn;
      })
    );
    // or:
    // this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
    //   console.log('isLoggedIn', isLoggedIn);
    // });

    // console.log('ngOnInit#postSubscription');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
