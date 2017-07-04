import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Family } from '../../models/family.model';
import { User } from '../../models/user.model';
import { Week } from '../../models/week.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})

export class RegisterComponent implements OnInit {

  public langs: string[] = [
    'English',
    'French',
    'German',
  ];
  public myform: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public password: FormControl;
  public repeatPassword: FormControl;
  public language: FormControl;

  constructor(public auth: AuthService) {

  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.repeatPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.language = new FormControl('', Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
      language: this.language
    });
  }

  register() {

  }

  login() {

  }
}
