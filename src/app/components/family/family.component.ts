import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialogModule } from '@angular/material';
import { User } from '../../models/user.model';
import { NewTodo } from '../../models/newTodo.model';
import { NewTodoComponent } from '../../components/new-todo/new-todo.component';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
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
  public tododata: Array<any> = [];
  public todosView: Array<any> = [];
  public usersdata: Array<any> = [];
  public userdata: Array<Object> = [];
  public currentWeek: FirebaseListObservable<any>;
  public currentTodos: FirebaseListObservable<any>;
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  public weekData: Array<any> = [];
  userName;
  public day = 0;
  public days = [];
  public actualDay = "";

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase, private route: ActivatedRoute, public ds: DataService) {
  }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        props.currentFamily = res.uid;
        console.log('logged in');
        this.users = this.db.list(`/families/${props.currentFamily}/users`, { preserveSnapshot: true });
        this.users
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              if (!(snapshot.key === '0') && (props.loadedUsers === false)) {
                props.usersdata.push(
                  ({
                    key: snapshot.key,
                    value: snapshot.val()
                  })
                )
              }
            });
            console.log(props.usersdata[0].key);
            this.selectUser(props.usersdata[0].key)
            this.getDay();
            props.loadedUsers = true;
          })
      } else {
        console.log('user not logged in');
      }
    });
  }

  userTodo(userId) {
    this.auth.authState.subscribe(res => {
      let props = this;
      props.tododata = [];
      if (res && res.uid) {
        props.currentFamily = res.uid;
        this.todos = this.db.list(`/families/${props.currentFamily}/users/${props.userId}/todos`, { preserveSnapshot: true });
        this.todos
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              props.tododata.push(
                ({
                  key: snapshot.key,
                  value: snapshot.val()
                })
              )
            });
            console.log("lla", props.tododata);

            //this.getTodos(this.day)
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
    console.log("sjkadhf", this.userId);

  }

  next() {
    this.day += 1;
    if (this.day == 7)
      this.day = 0

    console.log("day", this.weekData[this.day].value);
    this.getTodos(this.day)
  }

  back() {
    this.day -= 1;
    if (this.day == -1)
      this.day = 6

    this.getTodos(this.day)
  }

  getTodos(day) {
    console.log("day", day);
    console.log("data", this.tododata);
    this.todosView = [];
    for (var i in this.tododata) {
      if (this.tododata[i].value.day == this.day)
        this.todosView.push(this.tododata[i])
    }
    console.log("sdkf", this.todosView);

  }




}
