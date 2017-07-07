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

  constructor(public af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
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

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  loginWithEmail(pEmail: string, pPassword: string) {
    this.af.auth.signInWithEmailAndPassword(pEmail, pPassword).then((response) =>{
      this.authState = response
      this.router.navigateByUrl('/menu')
    })
  }

  logout() {
    this.af.auth.signOut();
  }

  emailSignUp(pEmail:string, pPassword:string, pName:string, pUsers: any, pWeeks: any) {
    return this.af.auth.createUserWithEmailAndPassword(pEmail, pPassword)
      .then((user) => {
        this.authState = user
        this.updateFamilyData(pName, pUsers, pWeeks)
        this.router.navigateByUrl('/menu')
      })
      .catch(error => console.log(error));
  }

  private updateFamilyData(pName: string, pUsers: any, pWeeks: any): void {

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

  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    let path = `families/${this.currentUserId}`; // Endpoint on firebase
    let data = {
                  email: this.authState.email,
                  name: this.authState.displayName
                }

    this.db.object(path).update(data)
    .catch(error => console.log(error));

  }

  private socialSignIn(provider) {
    return this.af.auth.signInWithPopup(provider)
      .then((credential) =>  {
          console.log(credential)
          this.authState = credential.user
          this.updateFamilyData(credential.additionalUserInfo.profile.name, [], [])
          this.router.navigateByUrl('/menu')
      })
      .catch(error => console.log(error));
  }

}
