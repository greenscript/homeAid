import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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

  constructor() {

  }

  ngOnInit() {
  }

  register() {
    console.log('let us in');

  }
}
