import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [AuthService]
})
export class UsersComponent implements OnInit {
  public users: FirebaseListObservable<any>;
  public selectedUser: FirebaseListObservable<any>;
  public userId: string = '';
  public usersdata: Array<any> = [];
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  title = "Usuarios";

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase) { }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        props.currentFamily = res.uid;
        console.log('logged in');
        this.users = this.db.list(`/families/${props.currentFamily}/users`, {preserveSnapshot: true});
        this.users
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            //console.log(snapshot.key)
            if (!(snapshot.key === '0') && (props.loadedUsers === false)) {
              props.usersdata.push(
                ({
                  key: snapshot.key,
                  value: snapshot.val()
                })
              )
            }
          });
          console.log(props.usersdata)
          props.loadedUsers = true;
        })
      } else {
        console.log('user not logged in');
      }
    });
  }

  selectUser(pUid) {
    console.log("select: " + pUid);
    this.userId = pUid;
  }
  

}
