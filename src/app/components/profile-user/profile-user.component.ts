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
  

  userName
  day = 0;
 

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase, private http: Http, private route: ActivatedRoute, public ds: DataService) {
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
          props.getUser()
          props.loadedUsers = true;
          props.getTodos(this.day);
          props.getDay()
        })
      } else {
        console.log('user not logged in');
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
            console.log("user", snapshot)
            props.userdata.push({
              key: snapshot.key,
              value: snapshot.val()
            })
            // llama a la funcion assignProperties
            //console.log(props.userdata)
          });
           props.assignProperties(props.userdata)
        })
      } else {
        console.log('user not logged in');
      }
    });
  }
  
  next(){
   this.day += 1;
   if (this.day == 7)
   this.day = 0

   console.log("day", this.weekData[this.day].value);
   this.getTodos(this.day)
  }

  back(){
    this.day -= 1; 
    if (this.day == -1)
    this.day = 6

    this.getTodos(this.day)
  }

   getDay() {
    this.auth.authState.subscribe(res => {
      if (res.uid) {
        this.userId = res.uid;
        this.currentWeek = this.db.list(`/families/${this.userId}/currentWeek/days`, { preserveSnapshot: true });
        this.currentWeek.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.weekData.push({ key: snapshot.key, value : snapshot.val().day})
          });
          console.log("weekData ", this.weekData[0].value);
        })
      }
    })
  }

  getTodos(day){
    this.todosView = [];
    console.log(this.day);
    for (var i in this.tododata){
      if(this.tododata[i].value.day == this.day)
      this.todosView.push(this.tododata[i])
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
  
}
