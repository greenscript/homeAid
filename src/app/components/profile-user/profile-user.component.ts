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
  public current: number= 50;
  public max: number = 100;
  public userName;
  public currentDate: Date = new Date();
  public day: number = this.currentDate.getDay();
  public dayView = this.currentDate.setDate(this.currentDate.getDate());
  public myBooleanValue: boolean = false;
  public d = this.currentDate;

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
          console.log("data!", props.tododata)
          props.getUser()
          props.loadedUsers = true;
          props.getTodos(this.day);
          props.getDay()
          this.getCurrentDayTodoId()
        })
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
           // console.log("user", snapshot)
            props.userdata.push({
              key: snapshot.key,
              value: snapshot.val()
            })
            // llama a la funcion assignProperties
            //console.log( "user", props.userdata.values)
          });
           props.assignProperties(props.userdata)
        })
      } else {
      //  console.log('user not logged in');
      }
    });
  }

  next(){

  this.dayView = this.d.setDate(this.d.getDate() + 1)
  //console.log(this.d)

   this.day += 1;
   if (this.day == 7){
     //console.log("++++", this.day);
     this.day = 0;
   }

   this.getTodos(this.day)
   this.getCurrentDayTodoId()

  }

  back(){
    this.dayView = this.d.setDate(this.d.getDate() - 1)
    this.day -= 1;
    if (this.day == -1)
    this.day = 6

    this.getTodos(this.day)
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
    this.todosView = [];
    //console.log("pday", pday);
    for (var i in this.tododata){
      if(this.tododata[i].value.day == pday)
      this.todosView.push(this.tododata[i])
    //  console.log("todoView", this.todosView)
    }
  }

  assignProperties(pData: Array<any>) {
    // recibe como parametro un array
    pData.forEach((pObject) => {
      // si existe la propiedad nombre en los datos del usuario sacados de firebase
      if (pObject.key === 'name') {
        // se le asigna el nombre a adminName
        // esto para tener el nombre o apellido de la familia y mostrarlo en la vista
        //console.log(pObject.value);
        this.userName = pObject.value
      }
    })
  }

  getCurrentDayTodoId() {
    let currentDayTodos = []
    this.daysKeys = []

    this.currentDayTodos = this.db.object(`/families/${this.currentFamily}/currentWeek/days/${this.day}/todos`, { preserveSnapshot: true });
    //console.log(`/families/${this.currentFamily}/currentWeek/days/${this.day}/todos`)
    this.currentDayTodos.subscribe(snapshots =>{
      snapshots.forEach(snapshot => {
        currentDayTodos.push({ key: snapshot.key, value : snapshot.val()})
      })
    })
    //console.log(currentDayTodos)
    currentDayTodos.filter((todo) => {
    //  console.log('asaasd' ,todo)
      if (todo.value.username === this.userId) {
        //this.todosView.push(todo)
      //  console.log(todo.key)
        this.daysKeys.push(todo.key)
      //  console.log(this.daysKeys)
      }
    })
  }

  clickHide(){
    this.myBooleanValue = !this.myBooleanValue;
   // this.showHide = !this.showHide;
  }

  backButton() {
    this.location.back();
  }

}
