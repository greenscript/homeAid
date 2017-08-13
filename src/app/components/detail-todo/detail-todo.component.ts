//import { Component, OnInit } from '@angular/core';
//import { Http } from '@angular/http';
//import { AuthService } from '../../services/auth.service';
//import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { DataService } from '../../services/data.service';

import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.scss'],
  providers: [AuthService]

})
export class DetailTodoComponent implements OnInit {
  public todoId: string;
  public userId: string;
  public usersArr: Array<any> = [];
  public users: FirebaseListObservable<any>;
  public loadedUsers: boolean = false;
  public currentTodo: FirebaseObjectObservable<any>;
  public currentDayTodo: FirebaseObjectObservable<any>;
  public todo: string;
  public uid: string;
  public currentFamily: string = '';
  public todoData: Array<any> = [];
  public dayId: string;
  public dayTodoId: string;
  public currentTodoData: Array<any> = [];
  public currentDayData: Array<any> = [];
  public pathUser: FirebaseListObservable<any>
  public userSelected: boolean = false;


  constructor(
    private as: AuthService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    //private http: Http,
    private route: ActivatedRoute,
    //public ds: DataService,
    public location: Location,
) {
    this.todoId = route.snapshot.paramMap.get('todoid');
    this.userId = route.snapshot.paramMap.get('id');
    this.dayId = route.snapshot.paramMap.get('dayId');
    this.dayTodoId = route.snapshot.paramMap.get('todoDayId');
  }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      if (res.uid) {
        this.currentFamily = res.uid
        this.currentTodo = this.db.object(`/families/${this.currentFamily}/users/${this.userId}/todos/${this.todoId}`, { preserveSnapshot: true });
        this.currentTodo.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.todoData.push({ key: snapshot.key, value: snapshot.val() })
          });
        })
      }
    })

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
                props.usersArr.push(
                  ({
                    key: snapshot.key,
                    value: snapshot.val()
                  })
                )
              }
            });
            this.currentTodoAndDayData();
            props.loadedUsers = true;
            //console.log('arr de usuarios',this.usersArr);
          })
      } else {
        console.log('user not logged in');
      }
    });
  }

  currentTodoAndDayData() {
    //let isCompleted_todo= false;

    this.currentTodo = this.db.object(`/families/${this.currentFamily}/users/${this.userId}/todos/${this.todoId}`, { preserveSnapshot: true });
    console.log(`/families/${this.currentFamily}/users/${this.userId}/todos/${this.todoId}`)
    this.currentDayTodo = this.db.object(`/families/${this.currentFamily}/currentWeek/days/${this.dayId}/todos/${this.dayTodoId}`, { preserveSnapshot: true });
    this.currentTodo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.currentTodoData.push({ key: snapshot.key, value: snapshot.val() })
      });

      //console.log(this.currentTodoData)
    })
    this.currentDayTodo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.currentDayData.push({ key: snapshot.key, value: snapshot.val() })
      });
      //console.log(this.currentDayData)
    })
  }

  completetask() {
    this.currentTodo.set({
      'category': this.currentTodoData[0].value,
      'day': this.currentTodoData[1].value,
      'description': this.currentTodoData[2].value,
      'relevance': this.currentTodoData[3].value,
      'status': true,
      'username': this.currentTodoData[5].value
    })
    this.currentDayTodo.set({
      'category': this.currentDayData[0].value,
      'day': this.currentDayData[1].value,
      'description': this.currentDayData[2].value,
      'relevance': this.currentDayData[3].value,
      'status': true,
      'username': this.currentDayData[5].value
    })
    this.location.back();
  }

  updateOnBothEnds(pUserTodo, pDayTodo) {
    let targets = []
    let currentTodoData = []
    let currentDayData = []
    targets.push(pUserTodo, pDayTodo);
    targets.forEach((o) => {
      o.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          o.push({ key: snapshot.key, value: snapshot.val() })
        });
      })
      o.currentTodo.set({
        'category': currentTodoData[0].value,
        'day': currentTodoData[1].value,
        'description': currentTodoData[2].value,
        'relevance': currentTodoData[3].value,
        'status': true,
        'username': currentTodoData[5].value
      })
    })
  }

  selectUser(pUid) {
    this.userId = pUid;
    console.log('selectedUser',this.userId);
    this.userSelected = true;

  }

  send() {
    let relevanceTodoForUser;

      //this.path.push(goaldObj);
        //console.log('objeto',goaldObj , ' y parametros', ptitle ,' ',pdescript);

    for (var i = 0; i < this.usersArr.length; i++) {
      console.log('arr de usuarios dentro del for',this.usersArr);
      if (this.userId == this.usersArr[i].key) {
        console.log('user id hacen mathccx',this.userId);
        //path para pararle la tarea a alguien mas.
        this.pathUser = this.db.list(`/families/${this.currentFamily}/users/${this.userId}/todos/`, { preserveSnapshot: true });
        console.log('PATH',this.pathUser);
        /*relevanceTodoForUser = {
          "category":,
          "day":,
          "description":,
          "points":,
          "relevance":,
          "status":,
          "username":

        }*/
        //this.pathUser.push(goaldObj);

        //path para cambiar el estado de tarea del usuario ACTUAL a none.

        //path de current week todo.
        if(this.userSelected){
          console.log('ya seleccionaron usuario');
        }
        //this.usersArr.push(this.todoId);
        //this.usersArr.push(this.dayTodoId);
        //this.selectedUser = this.db.list(`/families/${this.currentFamily}/users/${this.userId}/todos/`, { preserveSnapshot: true });


      } else {
        console.log("select a user first please");

      }
    }
    /*console.log("select: " + this.userId);
    console.log("arr: " + this.usersArr[i]);
    console.log("arr: " + this.usersArr);
    console.log("day: " + this.dayTodoId);
    console.log("todo: " + this.todoId);*/

  }
}
