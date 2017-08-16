import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialogModule } from '@angular/material';
import { User } from '../../models/user.model';
import { NewTodo } from '../../models/newTodo.model';
import { NewTodoComponent } from '../../components/new-todo/new-todo.component';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  providers: [AuthService, DataService]
})
export class FamilyComponent implements OnInit {
  public todos: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public selectedUser: FirebaseListObservable<any>;
  public userId: string = '';
  public routeId: string;
  public tododata: Array<any> = [];
  public todosView: Array<any> = [];
  public usersdata: Array<any> = [];
  public userdata: Array<Object> = [];
  public currentWeek: FirebaseListObservable<any>;
  public currentTodos: FirebaseListObservable<any>;
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  public weekData: Array<any> = [];
  public userName;
  public currentDate: Date = new Date();
  public day: number = this.currentDate.getDay();
  public dayView = this.currentDate.setDate(this.currentDate.getDate());
  public myBooleanValue: boolean = false;
  public d = this.currentDate;
  public selectedImage: string;
  public toggleObject: any = {
    item: 0
  }
  public goals: FirebaseListObservable<any>;
  public currentWeekGoal;
  public familyGoal: Array<any> = [];

  constructor(
    private as: AuthService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    private route: ActivatedRoute,
    public ds: DataService) {
    this.routeId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        this.currentFamily = res.uid;
        console.log('logged in');
        this.users = this.db.list(`/families/${this.currentFamily}/users`, { preserveSnapshot: true });
        this.users.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            if (!(snapshot.key === '0') && (this.loadedUsers === false)) {
              this.usersdata.push(({ key: snapshot.key, value: snapshot.val() }))
            }
          });
          this.selectUser(this.usersdata[0].key)
          this.getDay();
          this.loadedUsers = true;
        })
      } else {
        console.log('user not logged in');
      }
    });
    this.getFamilyGoal();
  }

  userTodo(userId) {
    this.auth.authState.subscribe(res => {
      this.tododata = [];
      if (res && res.uid) {
        this.currentFamily = res.uid;
        this.todos = this.db.list(`/families/${this.currentFamily}/users/${this.userId}/todos`, { preserveSnapshot: true });
        this.todos.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.tododata.push(
              ({
                key: snapshot.key,
                value: snapshot.val()
              })
            )
          });
          console.log("lla", this.tododata);
          this.getTodos(this.day)
        })
      } else {
        console.log('todos not logged in');
      }
    });
  }

  getDay() {
    this.auth.authState.subscribe(res => {
      if (res.uid) {
        this.userId = res.uid;
        this.currentWeek = this.db.list(`/families/${this.userId}/currentWeek/days`, { preserveSnapshot: true });
        this.currentWeek.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.weekData.push({ key: snapshot.key, value: snapshot.val().day })
          });
        })
      }
    })
  }

  selectUser(pUid) {
    console.log("select: " + pUid);
    this.userId = pUid;
    this.userTodo(this.userId);
  }

  selectImage(pEvent, pActive) {
    this.selectedImage = pEvent
    let absPath = window.location.origin + '/'
    if (this.selectedImage.includes(absPath)) {
      this.selectedImage = this.selectedImage.replace(absPath, '')
    }
  }

  next() {
    if (this.day == 6) {
      //me devuelve al lunes de la semana en la que se encutre.
      this.dayView = this.d.setDate(this.d.getDate() - 6)
      this.day = 0;
    } else {
      this.dayView = this.d.setDate(this.d.getDate() + 1)
      this.day += 1;
    }

    this.getTodos(this.day)
  }

  back() {
    if (this.day == 0) {
      this.dayView = this.d.setDate(this.d.getDate() + 6)
      this.day = 6
    } else {
      this.dayView = this.d.setDate(this.d.getDate() - 1)
      this.day -= 1;

    }

    this.getTodos(this.day)
  }

  getTodos(pday) {
    this.todosView = [];
    console.log("pday", pday);
    for (var i in this.tododata) {
      if (this.tododata[i].value.day == pday)
        this.todosView.push(this.tododata[i])
      console.log("todoView", this.todosView)
    }
  }

  getFamilyGoal() {
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('logged in');
        this.currentWeekGoal = this.db.list(`/families/${res.uid}/currentWeek/goals`, { preserveSnapshot: true });
        this.currentWeekGoal.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            console.log("dsh", snapshot.val());
            this.familyGoal.push(({ key: snapshot.key, value: snapshot.val() }))
            console.log("fG", this.familyGoal);

          });
        })
      } else {
        console.log('jj');
      }
    });
  }
}
