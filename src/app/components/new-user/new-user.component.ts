import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from "@angular/router";
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
    {src: 'assets/i-22.png', active: false},
    {src: 'assets/i-24.png', active: false},
    {src: 'assets/i-23.png', active: false}
  ]
  public selectedImage: string;
  public toggleObject: any = {
    item: -1
  }

  constructor(
    private as: AuthService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);

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
      if (res && res.uid) {
        console.log('logged in');
        this.users = this.db.list(`/families/${res.uid}/users/`, {preserveSnapshot: true});
      } else {
        console.log('user not logged in');
      }
    });



  }

  selectImage(pEvent, pActive) {
    this.selectedImage = pEvent
    let absPath = window.location.origin + '/'
    if (this.selectedImage.includes(absPath)) {
        this.selectedImage = this.selectedImage.replace(absPath, '')
    }
  }

  currentImage(pObjs) {
    let unactiveImage = this.avatars.filter((avatar) => {
      console.log(avatar)
    })

  }



  createUser() {
    if (this.userform.valid) {
      if (this.selectedImage) {
        this.users.push(new User(this.userName.value, this.selectedImage, 0, [], [], this.birthdate.value));
        this.toastr.success('Usuario creado!', 'Success!')
      }
    }
  }
}
