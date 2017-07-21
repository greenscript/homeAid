import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../models/user.model';
import { NewTodo } from '../../models/newTodo.model';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
  providers: [AuthService]
})
export class ProfileUserComponent implements OnInit {
  public users: FirebaseListObservable<any>;
  public selectedUser: FirebaseListObservable<any>;
  public userId: string = '';
  public usersdata: Array<any> = [];
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  public currentUser;

  id;
  allTodos = new Array;
  todos = new Array;
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
    this.loadData('../assets/data/todos.json');
  }

  loadData(todosUrl: string) {
    this.http.get(todosUrl).map(res => res.json()).subscribe((data) => {
      this.allTodos = data;
      //this.getTodos(this.day);
    });
  }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        props.currentFamily = res.uid;
        console.log('logged in');
        this.users = this.db.list(`/families/${props.currentFamily}/users`, {preserveSnapshot: true});
        this.users
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            //console.log(snapshot.key)
            if (!(snapshot.key === '0') && (props.loadedUsers === false)) {
              props.usersdata.push(
                ({
                  key: snapshot.key,
                  value: snapshot.val()
                })
              )
            }
          });
          console.log(props.usersdata)
          //props.loadedUsers = true;
          props.getUser();
        })
      } else {
        console.log('user not logged in');
      }
    });

   

  }

  getUser(){
    let newArray = new Array;
      this.id = this.route.params.subscribe(params => { 
      for (var i in this.usersdata)
        if(this.usersdata[i].key == params['id'])
           this.currentUser = this.usersdata[i];
           for (var i in this.currentUser.value.todos){
            console.log( this.currentUser.value.todos[i])
            newArray.push(JSON.stringify(this.currentUser.value.todos))
          }
          this.todos =  newArray;
          for (var i in this.todos){
            console.log(this.todos[i]);
          }
    });
  }
  
  next(){
   this.day += 1;
   if (this.day == 7)
   this.day = 0

   //this.getTodos(this.day)
  }

  back(){
    this.day -= 1;
    console.log(this.day);
    
    if (this.day == -1)
    this.day = 6

    //this.getTodos(this.day)
  }

  getTodos(day){
    /*var newArray = new Array;
    for (var i in this.allTodos){
      if(this.allTodos[i].day == this.days[this.day].name)
      newArray.push(this.allTodos[i])
    }
    this.todos = newArray;*/
    this.todos = this.currentUser.value.todos;
    
  }

}
