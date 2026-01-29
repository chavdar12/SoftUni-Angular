import {Component, OnInit} from '@angular/core';
import {CustomerService, IPost} from "../customer.setvice";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customer-profile-posts',
  templateUrl: './customer-profile-posts.component.html',
  styleUrls: ['./customer-profile-posts.component.css']
})
export class CustomerProfilePostsComponent implements OnInit {

  posts: IPost[] = [];

  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.posts = data['posts'];
    })
  }
}
