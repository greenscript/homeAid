import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @Input() reports: Array<any>;
  public uid: string = '';
  public currentFamily: FirebaseListObservable<any>;
  public currentFamilyUsers: FirebaseListObservable<any>;
  public familyUsersData: Array<any> = [];

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) { }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      if (res.uid) {
        this.uid = res.uid;
        this.getUsers();
      }
    })
  }

  getUsers() {
    this.currentFamilyUsers = this.db.list(`families/${this.uid}/users/`, { preserveSnapshot: true });
    this.currentFamilyUsers.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.familyUsersData.push({
          key: snapshot.key,
          value: snapshot.val()
        })
      });
      console.log(this.familyUsersData)
    });
  }

  trying() {

    let data = {
      description: 'asd',
      name: 'asd'
    }

    this.currentFamily = this.db.list(`families/${this.uid}/reports`)
    this.currentFamily.push(data);
  }
}
