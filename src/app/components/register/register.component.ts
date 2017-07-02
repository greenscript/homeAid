import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';

import { Family } from '../../models/family.model';
import { User } from '../../models/user.model';
import { Week } from '../../models/week.model';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})

export class RegisterComponent implements OnInit {

  @Input() name: string;
  @Input() email: string;
  @Input() password: string;
  @Input() repeatPassword: string;

  public securityQuestions = [
    { key: 1, text: '¿asdasdasd?' },
    { key: 2, text: '¿asdasde2113?' },
    { key: 3, text: '¿asdasdasd123123?' },
    { key: 4, text: '¿asdasdasdllll?' }
  ]

  constructor(public auth: AuthService) {

  }

  ngOnInit() {
  }

  register() {
    this.auth.emailSignUp(this.email, this.password, this.name, [], []);
  }

  login() {

  }
}
