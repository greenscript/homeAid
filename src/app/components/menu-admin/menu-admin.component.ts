import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class MenuAdminComponent implements OnInit, OnDestroy {
  public families: FirebaseListObservable<any>;
  public userdata: Array<Object> = [];
  public adminName: string;
  public adminId: string;
  public usersData: FirebaseListObservable<any>;
  public usersdata: Array<any> = [];
  public daysData: FirebaseListObservable<any>;
  public daysdata: Array<any> = [];
  public uData: Array<any> = [];
  public uid: string;
  public usersWithTodos: Array<any> = [];
  public daysWithTodos: Array<any> = [];
  public usersTodos: Array<any> = [];
  public totalWeekTodos: Array<any> = [];
  public completedTodos: Array<Object> = [];
  public reports: Array<any> = [];
  public a
  public b
  public c
  constructor(
    private as: AuthService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public ds: DataService,
    public route: ActivatedRoute,
    public router: Router) {
      this.adminId = route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.b =  this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        this.uid = res.uid;
        this.families = this.db.list(`/families/${this.uid}`, {preserveSnapshot: true});
        this.a = this.families.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userdata.push({ key: snapshot.key, value: snapshot.val() })
          });
          if (this.router.url === `/menu/${this.adminId}`) {
            this.assignProperties(this.userdata)
            this.getUsersData();

          }
        })
      } else {
        this.router.navigateByUrl('/');
      }

    });
  }

  ngOnDestroy() {

    this.a.unsubscribe()
    this.b.unsubscribe()
    this.c.unsubscribe()
  }

  assignProperties(pData: Array<any>) {
    pData.forEach((pObject) => {
      if (pObject.key === 'name') {
        this.adminName = pObject.value
      }
    })
  }

  getUsersData() {
    this.usersData = this.db.list(`families/${this.uid}/users/`, {preserveSnapshot: true});
    this.c = this.usersData.subscribe(snapshots => {
      console.log(snapshots, "es")

      snapshots.forEach(snapshot => { this.usersdata.push({ key: snapshot.key, value: snapshot.val() }) });
      this.getUsersWithTodos();
    });
  }

  getUsersWithTodos() {
    this.usersdata.filter((user)=> {
      if (user.value.todos != 0 && user.value.todos != undefined) {
        this.usersWithTodos.push(user)
      }
    })
    console.log(this.usersWithTodos)
    if (this.usersWithTodos.length > 0) {
      this.generateReports()
    }
  }

  generateReports() {
    this.usersWithTodos.forEach(o => {
      let a = Object.keys(o.value.todos).length;
      let b = [];
      console.log(o.value.todos)
      Object.values(o.value.todos).forEach(q => {
        if (q.status === false) {
          b.push(q)
        }
      })
      let report = {
        name: o.value.name,
        avatar: o.value.avatar,
        color: o.value.styles,
        total: a,
        done: a - b.length,
        percentage: this.getPercentage(a, b)
      }
      this.reports.push(report)
    })
  }

  getPercentage(pTotal, pUndone) {
    pUndone = pUndone.length > 0 ? pUndone.length : 0
    console.log(pUndone)
    let todos = pTotal - pUndone
    let percentage =  todos / pTotal * 100;
    if (!Number.isInteger(percentage)) {
      percentage = Math.floor(percentage)
    }
    console.log(percentage)
    return percentage
  }
}
