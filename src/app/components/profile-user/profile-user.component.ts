import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../models/user.model';
import { NewTodo } from '../../models/newTodo.model';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
  providers: [AuthService]
})
export class ProfileUserComponent implements OnInit {
  public todos: FirebaseListObservable<any>;
  public selectedUser: FirebaseListObservable<any>;
  public userId: string = '';
  public tododata: Array<any> = [];
  public todosView: Array<any> = [];
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  public currentUser;
  
  day = 0;
  days = [
    {"name": "Lunes"},
    {"name": "Martes"},
    {"name": "Miércoles"},
    {"name": "Jueves"},
    {"name": "Viernes"},
    {"name": "Sábado"},
    {"name": "Domingo"},
  ];

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase, private http: Http, private route: ActivatedRoute) {
    //this.loadData('../assets/data/todos.json');
    this.userId = route.snapshot.paramMap.get('id');
    console.log(this.userId)
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
          console.log(props.tododata);
          props.loadedUsers = true;
          props.getTodos(this.day);
        })
      } else {
        console.log('user not logged in');
      }
    });
  }

  /*getUser(){
    //let newArray = new Array;
      //this.id = this.route.params.subscribe(params => { 
      for (var i in this.usersdata)
        if(this.usersdata[i].key == params['id'])
           this.currentUser = this.usersdata[i];
           for (var i in this.currentUser.value.todos){
            console.log("all" + this.currentUser.value.todos[i])
            newArray.push(JSON.stringify(this.currentUser.value.todos));
            //newArray.push(this.currentUser.value.todos);
          }
          this.todos =  newArray;
          for (var i in this.todos){
           // console.log("i"+this.todos[i]);
            console.log("0"+this.todos[i][0]);
          }
    });
  }*/
  
  next(){
   this.day += 1;
   if (this.day == 7)
   this.day = 0

   this.getTodos(this.day)
  }

  back(){
    this.day -= 1; 
    if (this.day == -1)
    this.day = 6

    this.getTodos(this.day)
  }

  getTodos(day){
    this.todosView = [];
    for (var i in this.tododata){
      if(this.tododata[i].value.day == this.days[this.day].name)
      this.todosView.push(this.tododata[i])
    }
    //this.todosView = newArray;
    console.log(this.todosView)
  }

}
