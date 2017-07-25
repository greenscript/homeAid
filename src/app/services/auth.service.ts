import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

//models
import { User } from '../models/user.model';
import { Week } from '../models/week.model';
import { Family } from '../models/family.model';
import { Day } from '../models/day.model';

@Injectable()
export class AuthService {

  public authState: any = null;
  public curr: any = new Date;
  public first: any = this.curr.getDate() - this.curr.getDay();
  public last: any = this.first + 6;
  public firstday: any = new Date(this.curr.setDate(this.first)).toUTCString();
  public lastday: any = new Date(this.curr.setDate(this.last)).toUTCString();
  public currentWeek: any = new Week({}, this.firstday, this.lastday, this.getWeekDays(this.firstday, this.lastday));

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
    let adminUser: any = new User(pName,'assets/i-22.png', 0, [], [], '');

    return this.af.auth.createUserWithEmailAndPassword(pEmail, pPassword)
      .then((user) => {
        this.authState = user
        this.updateFamilyData(pName, [adminUser], [{}], this.currentWeek)
        this.router.navigateByUrl('/menu')
      })
      .catch(error => console.log(error));
  }

  public getWeekDays(startDate, stopDate) {
    console.log(startDate, stopDate)
    let dateArray: Array<any> = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
      console.log('asd')
       dateArray.push( new Day (new Date(currentDate)) )
       for (let i = 0; i < 6; i++) {
         currentDate = new Date(currentDate)
         currentDate = currentDate.setDate(currentDate.getDate() + 1);
         dateArray.push( new Day (new Date(currentDate) ) )
       }
    }
    console.log(dateArray);
    return dateArray;
  }

  private updateFamilyData(pName: string, pUsers: any, pWeeks: any, pCurrentWeek: any): void {
    let path = `families/${this.currentUserId}`;
    let data = new Family(this.authState.email, pName, pUsers, pWeeks, pCurrentWeek)
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
                ], [], this.currentWeek)
            break;
            case 'facebook.com':
              this.updateFamilyData(credential.additionalUserInfo.profile.last_name,
                [
                    new User(credential.additionalUserInfo.profile.first_name, 'assets/i-22.png', 0, [], [], '')
                ], [], this.currentWeek)
            break;
          }
          this.authState = credential.user

          this.router.navigateByUrl('/menu')
      })
      .catch(error => console.log(error));
  }

}
