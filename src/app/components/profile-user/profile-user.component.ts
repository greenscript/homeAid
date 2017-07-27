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
  public userdata: Array<any> = [];
  public userId: string = '';
  public tododata: Array<any> = [];
  public todosView: Array<any> = [];
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  public currentWeek: FirebaseListObservable<any>;
  public currentDay: any;
  public weekData: Array<any> = [];
  public actualDay: string = '';
  public currentDayIndex: number = 0;
  public currentDay: any;
  public days = [];
  public userName: string
  public day = 0;


  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase, private http: Http, private route: ActivatedRoute, public ds: DataService) {
    this.userId = route.snapshot.paramMap.get('id');
    //console.log(this.userId)
  }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
         this.currentFamily = res.uid;
         console.log(this.currentFamily)
         this.getUser()
      }
    });
  }

  getUser(){
      this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        this.selectedUser = this.db.list(`/families/${this.currentFamily}/users/${this.userId}`, {preserveSnapshot: true});
        this.selectedUser.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userdata.push({ key: snapshot.key, value: snapshot.val() })
          });
          this.userName = this.userdata[2].value
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

   this.getTodos(this.day)
  }

  back(){
    this.day -= 1;
    if (this.day == -1 || this.day === 0)
    this.day = 6

    this.getTodos(this.day)
  }

   getDay() {
    this.auth.authState.subscribe(res => {

      if (res.uid) {
        this.userId = res.uid;
        this.currentWeek = this.db.list(`/families/${this.userId}/currentWeek`, { preserveSnapshot: true });
        this.currentWeek.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.weekData.push({ key: snapshot.key, value: snapshot.val() })
          });
          this.days = this.weekData[0].value;
          this.currentDay = this.days[0].day;
          this.getTodos(this.actualDay);
          this.getTodos(this.currentDayIndex)
        })
      }
    })
  }

  getTodos(day){
    this.todosView = [];
    //Nota: El nombre del Día tiene que estar en Mayuscaula, tal como sale en el array days
    //Si no aparecera []
    console.log(this.tododata);
    console.log(this.day);
    for (var i in this.tododata){
      if(this.tododata[i].value.day == this.currentDayIndex)
      this.todosView.push(this.tododata[i])
    }
   // console.log(this.todosView);
  }
}
