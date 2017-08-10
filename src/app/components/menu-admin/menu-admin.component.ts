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
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        this.uid = res.uid;
        this.families = this.db.list(`/families/${this.uid}`, {preserveSnapshot: true});
        this.families.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userdata.push({ key: snapshot.key, value: snapshot.val() })
          });
          this.assignProperties(this.userdata)
          this.getUsersData();
          this.getDaysData();
        })
      } else {
        this.router.navigateByUrl('/');
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

  getUsersData() {
    this.usersData = this.db.list(`families/${this.uid}/users/`, {preserveSnapshot: true});
    this.usersData.subscribe(snapshots => {
      snapshots.forEach(snapshot => { this.usersdata.push({ key: snapshot.key, value: snapshot.val() }) });
      this.getUsersWithTodos();
    });
  }

  getDaysData() {
    this.daysData = this.db.list(`families/${this.uid}/currentWeek/days`, {preserveSnapshot: true});
    this.daysData.subscribe(snapshots => {
      snapshots.forEach(snapshot => { this.daysdata.push({ key: snapshot.key, value: snapshot.val() }) });
      this.getDaysWithTodos();
      this.getWeekPercentage();
      this.getTotalWeekTodos();

    })
  }

  getDaysWithTodos() {
    this.daysdata.filter((day)=>{
      if (!(day.value.todos === undefined)) {
        this.daysWithTodos.push(day)
      }
    })
  }

  getTotalWeekTodos() {
    this.daysWithTodos.filter( day => {
      if (day.value.todos) {
        this.totalWeekTodos.push(Object.values(day.value.todos))
      }
    })
    this.totalWeekTodos = this.totalWeekTodos[0].concat(this.totalWeekTodos[1])
    console.log(this.totalWeekTodos)
  }

  getWeekPercentage() {
    
  }

  // getWeekPercentage2() {
  //   let totalTodos = this.totalTodos.filter(todo => {
  //     if (todo.status === false) {
  //       this.undoneTodos.push(todo);
  //       console.log(this.undoneTodos)
  //     }
  //   })
  //
  //   let todos = this.totalTodos.length - this.undoneTodos.length
  //   console.log(this.totalTodos.length, this.undoneTodos.length)
  //   console.log(todos)
  //   let percentage =  todos / this.totalTodos.length * this.max;
  //   console.log(percentage)
  //   this.current = percentage;
  //   this.percentage = `${percentage}%`
  //   console.log(this.percentage)
  // }

  getUsersWithTodos() {
    this.usersdata.filter((user)=> {
      if (!(user.value.todos === undefined)) {
        this.usersWithTodos.push(user)
        this.getCompletedTodos(this.usersWithTodos);
      }
    })
  }

  getUsersWeekTodos(pUsers) {
    pUsers.forEach(o => {
      let a = Object.keys(o);
      // let user: FirebaseListObservable<any> = this.db.list(`families/${this.uid}/users/${a}/days/`)
    })
  }


  getCompletedTodos(pArray) {
    pArray.forEach(o => {
      Object.values(o.value.todos).filter(todo => {
        if (todo.status === true) {
          this.completedTodos.push({ user: todo.username, todos: todo })
        }
      })
    })
  }

  matchUserAndWeek() {
    this.getCompletedTodos(this.daysWithTodos);
    this.completedTodos.forEach(o => {
      let username = Object.values(o).shift()
      let todoUser = Object.values(o)[1].username;
      let todoData = Object.values(o)[1];

      if (username === todoUser) {

      }
    })

  }

  generateReports() {

  }
}
