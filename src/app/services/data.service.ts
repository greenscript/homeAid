import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class DataService {


  public authState: any = null;

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {
    this.auth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  regularUsers() {
   this.auth.authState.subscribe(res => {
     let props = [];
     let loaded: Boolean = false;
     let users: FirebaseListObservable<any>;
     if (res && res.uid) {
       users = this.db.list(`/families/${res.uid}/users`, {preserveSnapshot: true});
       users.subscribe(snapshots => {
         snapshots.forEach(snapshot => {
           if (!(snapshot.key === '0') && (loaded === false)) {
             props.push(({key: snapshot.key, value: snapshot.val()}))
            }
         });
         loaded = true;
       })
     } else {
       console.log('user not logged in');
     }
   });
  }

  getAdmin() {
   this.auth.authState.subscribe(res => {
     let props = [];
     let loaded: Boolean = false;
     let users: FirebaseListObservable<any>;
     if (res && res.uid) {
       users = this.db.list(`/families/${res.uid}/users`, {preserveSnapshot: true});
       users.subscribe(snapshots => {
         snapshots.forEach(snapshot => {
           if ((snapshot.key === '0') && (loaded === false)) {
             props.push(({key: snapshot.key, value: snapshot.val()}))
            }
         });
         console.log(props)
         loaded = true;
         return props;
       })
     } else {
       console.log('user not logged in');
     }
   });
  }

  allUsers() {
   this.auth.authState.subscribe(res => {
     let props = [];
     let loaded: Boolean = false;
     let users: FirebaseListObservable<any>;
     if (res && res.uid) {
       users = this.db.list(`/families/${res.uid}/users`, {preserveSnapshot: true});
       users.subscribe(snapshots => {
         snapshots.forEach(snapshot => {
           if (loaded === false) {
             props.push(({key: snapshot.key, value: snapshot.val()}))
            }
         });
         console.log(props)
         loaded = true;
         return props;
       })
     } else {
       console.log('user not logged in');
     }
   });
  }

  getCurrentWeek(): Observable<any> {
    let currentWeek: FirebaseListObservable<any>;
      currentWeek = this.db.list(`/families/${this.currentUserId}/currentWeek`, {preserveSnapshot: true});
      // currentWeek.subscribe(snapshots => {
      //    snapshots.forEach(snapshot => {
      //       props.push(({key: snapshot.key, value: snapshot.val()}))
      //   });
      // })
      console.log(currentWeek);
      return currentWeek;
  }






}
