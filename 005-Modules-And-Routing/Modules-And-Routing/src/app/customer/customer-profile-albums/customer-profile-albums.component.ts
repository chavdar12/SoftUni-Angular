import {Component, OnInit} from '@angular/core';
import {CustomerService, IAlbum} from "../customer.setvice";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customer-profile-albums',
  templateUrl: './customer-profile-albums.component.html',
  styleUrls: ['./customer-profile-albums.component.css']
})
export class CustomerProfileAlbumsComponent implements OnInit {

  albums: IAlbum[] = [];

  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.parent!.snapshot.params['id'];
    this.customerService.getAlbumsByUserId$(id).subscribe(albums => {
      this.albums = albums;
    })
  }
}
