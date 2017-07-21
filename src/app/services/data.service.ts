import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class DataService {

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {}

  users() {
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
         console.log(props)
         loaded = true;
         return props;
       })
     } else {
       console.log('user not logged in');
     }
   });
  }

  admin() {
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



}
