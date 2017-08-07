import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
  providers: [AuthService, DataService]
})
export class MenuAdminComponent implements OnInit {
  public families: FirebaseListObservable<any>;
  public userdata: Array<Object> = [];
  public adminName: string;
  public adminId: string;
  constructor(
    private as: AuthService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public ds: DataService,
    public route: ActivatedRoute) {
      this.adminId = route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        this.families = this.db.list(`/families/${res.uid}`, {preserveSnapshot: true});
        this.families
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

  assignProperties(pData: Array<any>) {
    pData.forEach((pObject) => {
      if (pObject.key === 'name') {
        this.adminName = pObject.value
      }
    })
  }
}
