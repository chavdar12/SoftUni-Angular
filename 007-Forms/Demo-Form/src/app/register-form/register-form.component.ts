import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, AfterViewInit {

  buildings: string[] = [
    'Designer',
    'Developer',
    'QA'
  ]

  @ViewChild('registration') registration!: NgForm;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log(this.registration.value);
    console.log(this.registration.invalid);
  }

  onSubmit(): void {
    if (this.registration.value.password != this.registration.value.rePass) {
      console.log(`passwords don't match`);
    }
    console.log(this.registration.value);
  }

  clearForm(): void {
    // form.patchValue -> change part of the form
    this.registration.form.setValue({
      'username': '',
      'email': '',
      'tel': '',
      'building': '',
      'password': '',
      're-password': ''
    })
    this.registration.form.markAllAsTouched();
    // this.registration.reset();
  }
}
