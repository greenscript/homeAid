import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
  providers: [AuthService]
})
export class MenuAdminComponent implements OnInit {
  public items: FirebaseListObservable<any>;
  public userdata: Array<Object> = [];
  public adminName: string;
  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase) {

    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        console.log('logged in');
        this.items = db.list(`/families/${res.uid}`, {preserveSnapshot: true});
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

  ngOnInit() {

  }

  assignProperties(pData) {
    pData.forEach((pObject) => {
      if (pObject.key === 'name') {
        this.adminName = pObject.value
      }
    })
  }
}
