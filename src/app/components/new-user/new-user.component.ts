import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class NewUserComponent implements OnInit, OnChanges {
  public items: FirebaseListObservable<any>;
  public userdata: Array<Object> = [];
  public adminName: string;
  public userform: FormGroup;
  public userName: FormControl;
  public birthdate: FormControl;
  public avatars: Array<any> = [
    {src: 'assets/i-22.png'},
    {src: 'assets/i-24.png'},
    {src: 'assets/i-23.png'}
  ]

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase) {

  }

  ngOnChanges() {

  }

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
      let props = this;
      if (res && res.uid) {
        console.log('logged in');
        this.items = this.db.list(`/families/${res.uid}`, {preserveSnapshot: true});
        this.items
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            props.userdata.push({
              key: snapshot.key,
              value: snapshot.val()
            })
            props.assignProperties(props.userdata)
          });
        })
      } else {
        console.log('user not logged in');
      }
    });

  }

  assignProperties(pData) {
    pData.forEach((pObject) => {
      if (pObject.key === 'name') {
        this.adminName = pObject.value
      }
    })
  }

  createUser() {
    console.log(this.userName.valid);

    if (this.userform.valid) {
      console.log('asd');
      this.items.push(
        new User(this.userName.value, 'assets/i-22.png', 0, [], [], this.birthdate.value)
      );
    }
  }

}
