import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

//models
import { User } from '../models/user.model';
import { Week } from '../models/week.model';


@Injectable()
export class AuthService {

  public authState: any = null;

  constructor(public af: AngularFireAuth, private db: AngularFireDatabase) {
    this.af.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  loginWithGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithEmail(pEmail: string, pPassword: string) {
    this.af.auth.signInWithEmailAndPassword(pEmail, pPassword);
  }

  logout() {
    this.af.auth.signOut();
  }

  emailSignUp(pEmail:string, pPassword:string, pName:string, pUsers: User[], pWeeks: Week[]) {
    return this.af.auth.createUserWithEmailAndPassword(pEmail, pPassword)
      .then((user) => {
        this.authState = user
        this.updateFamilyData(pName, pUsers, pWeeks)
      })
      .catch(error => console.log(error));
  }

  private updateFamilyData(pName: string, pUsers: User[], pWeeks: Week[]): void {

    let path = `families/${this.currentUserId}`; // Endpoint on firebase
    let data = {
                  email: this.authState.email,
                  displayName: this.authState.displayName,
                  name: pName,
                  users: pUsers,
                  weeks: pWeeks
                }

    this.db.object(path).update(data)
    .catch(error => console.log(error));

  }

}
