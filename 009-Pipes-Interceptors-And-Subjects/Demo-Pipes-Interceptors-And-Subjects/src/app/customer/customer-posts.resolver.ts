import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CustomerService, IPost} from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerPostsResolver implements Resolve<IPost[]> {
  constructor(private customerService: CustomerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPost[]> {
    return this.customerService.getPostsByUserId$(route.parent!.params['id']);
  }
}
