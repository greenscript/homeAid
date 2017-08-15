import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../models/user.model';
import { NewTodo } from '../../models/newTodo.model';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
  providers: [AuthService, DataService]
})
export class ProfileUserComponent implements OnInit {
  public todos: FirebaseListObservable<any>;
  public selectedUser: FirebaseListObservable<any>;
  public userdata: Array<Object> = [];
  public userId: string = '';
  public tododata: Array<any> = [];
  public todosView: Array<any> = [];
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  public currentWeek: FirebaseListObservable<any>;
  public weekData: Array<any> = [];
  public days = [];
  public currentDayTodoId: string;
  public currentDayTodos: FirebaseObjectObservable<any>;
  public daysKeys: Array<any> = [];
  public current: number = 0;
  public max: number = 100;
  public userName;
  public currentDate: Date = new Date();
  public day: number = this.currentDate.getDay();
  public dayView = this.currentDate.setDate(this.currentDate.getDate());
  public myBooleanValue: boolean = false;
  public d = this.currentDate;
  public userAvatar: string;
  public currentDayTodosArr: Array<any> = [];
  public fillAttr:string = '5aabc5';

  constructor(
    private as: AuthService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    private http: Http,
    private route: ActivatedRoute,
    public ds: DataService,
    public location: Location) {
    //this.loadData('../assets/data/todos.json');
    this.userId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        props.currentFamily = res.uid;
        this.todos = this.db.list(`/families/${props.currentFamily}/users/${props.userId}/todos`, {preserveSnapshot: true});
        this.todos
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            if (!(snapshot.key === '0') && (props.loadedUsers === false)) {
              props.tododata.push(
                ({
                  key: snapshot.key,
                  value: snapshot.val()
                })
              )
            }
          });
          console.log("data todo!", props.tododata)
          props.loadedUsers = true;
                  props.getTodos(this.day);
        })
        props.getDay()
        this.getCurrentDayTodoId()
        props.getUser()

      } else {
        //console.log('user not logged in');
      }
    });
  }

  getUser(){
     this.ds.allUsers();
     //console.log(this.ds.allUsers());
      this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        this.selectedUser = this.db.list(`/families/${props.currentFamily}/users/${props.userId}`, {preserveSnapshot: true});
        this.selectedUser
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            //console.log("user", snapshot)
            props.userdata.push({
              key: snapshot.key,
              value: snapshot.val()
            })
            // llama a la funcion assignProperties
            console.log( "user", props.userdata)
          });
           props.assignProperties(props.userdata)
        })
      } else {
      //  console.log('user not logged in');
      }
    });
  }

  next(){
   if (this.day == 6){
     //me devuelve al lunes de la semana en la que se encutre.
     this.dayView = this.d.setDate(this.d.getDate() - 6)
     this.day = 0;
     console.log("++++", this.day);
   }else{
    this.dayView = this.d.setDate(this.d.getDate() + 1)
    this.day += 1;
    console.log("++++", this.day);
   }

   this.getTodos(this.day)
   this.getCurrentDayTodoId()

  }

  back(){
    //console.log("back", this.day);
    if (this.day == 0){
     this.dayView = this.d.setDate(this.d.getDate() + 6)
     this.day = 6
     console.log("--", this.day);
    }else{
      this.dayView = this.d.setDate(this.d.getDate() - 1)
      this.day -= 1;
      console.log("--", this.day);
    }

    this.getTodos(this.day)
    this.getCurrentDayTodoId()
  }

   getDay() {
    this.currentWeek = this.db.list(`/families/${this.currentFamily}/currentWeek/days`, { preserveSnapshot: true });
    this.currentWeek.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.weekData.push({ key: snapshot.key, value : snapshot.val().day})
      });
    //  console.log("weekData ", this.weekData);
    })
  }

  getTodos(pday){
    console.log("get", pday)
    this.todosView = [];
    console.log("todoData", this.tododata);
    for (var i in this.tododata){
      if(this.tododata[i].value.day == pday)
      this.todosView.push(this.tododata[i])
      console.log("todoView", this.todosView)
  }
  this.getCompleted();
}

  assignProperties(pData: Array<any>) {
    pData.forEach((pObject) => {
      switch (pObject.key) {
        case 'name':
          this.userName = pObject.value
        break;
        case 'avatar':
          this.userAvatar = pObject.value
        break;
        case 'styles':
           this.fillAttr = pObject.value
           console.log("color", this.fillAttr)
      }
    })
  }

  getCurrentDayTodoId() {
    this.daysKeys = []
    this.currentDayTodos = this.db.object(`/families/${this.currentFamily}/currentWeek/days/${this.day}/todos`, { preserveSnapshot: true });
    this.currentDayTodos.subscribe(snapshots =>{
      snapshots.forEach(snapshot => {
        this.currentDayTodosArr.push({ key: snapshot.key, value : snapshot.val()})
      })
      let a = this.currentDayTodosArr.filter(todo => todo.value.username === this.userId);
      a.forEach(o => {
        this.daysKeys.push(Object.values(o).shift())
      })
      console.log(this.daysKeys)
    })

  }

  clickHide(){
    this.myBooleanValue = !this.myBooleanValue;
   // this.showHide = !this.showHide;
  }

  getCompleted(){
    var percent;
    var completed = 0;
    this.current = 0;
     for (var i in this.todosView){
        if(this.todosView[i].value.status == true){
          completed += 1;
          percent = (100 / this.todosView.length);

        }
      }
    this.current = percent * completed;
  }
}
