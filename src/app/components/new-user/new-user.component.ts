import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
    providers: [AuthService, Validators]
})
export class NewUserComponent implements OnInit {
  public users: FirebaseListObservable<any>;
  public userform: FormGroup;
  public userName: FormControl;
  public birthdate: FormControl;
  public avatars: Array<any> = [
    {src: 'assets/i-22.png'},
    {src: 'assets/i-24.png'},
    {src: 'assets/i-23.png'}
  ]

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase) {}

  createFormControls() {
    this.userName = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);
    this.birthdate = new FormControl('', Validators.required);
  }

  createForm() {
    this.userform = new FormGroup({
      userName: this.userName,
      birthdate: this.birthdate
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('logged in');
        this.users = this.db.list(`/families/${res.uid}/users/`, {preserveSnapshot: true});
      } else {
        console.log('user not logged in');
      }
    });
  }

  createUser() {
    if (this.userform.valid) {
      this.users.push(new User(this.userName.value, 'assets/i-22.png', 0, [], [], this.birthdate.value));
    }
  }
}
