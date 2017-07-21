import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

//models
import { User } from '../models/user.model';
import { Week } from '../models/week.model';
import { Family } from '../models/family.model';


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

  emailSignUp(pEmail:string, pPassword:string, pName:string) {
    return this.af.auth.createUserWithEmailAndPassword(pEmail, pPassword)
      .then((user) => {
        this.authState = user
        this.updateFamilyData(pName,
          new User(pName,'assets/i-22.png', 0, [], [], '')
          , [{}], {})
        this.router.navigateByUrl('/menu')
      })
      .catch(error => console.log(error));
  }

  private updateFamilyData(pName: string, pUsers: any, pWeeks: any, pCurrentWeek: any): void {
    let path = `families/${this.currentUserId}`;
    let data = new Family(this.authState.email, pName, pUsers, pWeeks, pCurrentWeek)
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
          switch (credential.credential.providerId) {
            case 'google.com':
              this.updateFamilyData(credential.additionalUserInfo.profile.family_name,
                [
                    new User(credential.additionalUserInfo.profile.given_name, 'assets/i-22.png', 0, [], [], '')
                ], [], {})
            break;
            case 'facebook.com':
              this.updateFamilyData(credential.additionalUserInfo.profile.last_name,
                [
                    new User(credential.additionalUserInfo.profile.first_name, 'assets/i-22.png', 0, [], [], '')
                ], [], {})
            break;
          }
          this.authState = credential.user

          this.router.navigateByUrl('/menu')
      })
      .catch(error => console.log(error));
  }

}
