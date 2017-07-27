import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.scss'],
  providers: [DataService, AuthService]

})
export class DetailTodoComponent implements OnInit {
  public todoId: string;
  public userId: string;
  public currentTodo: FirebaseObjectObservable<any>;
  public currentDayTodo: FirebaseObjectObservable<any>;
  public todo: string;
  public uid: string;
  public currentFamily: string = '';
  public todoData: Array<any> = [];
  public todoCompleted;
  public dayId: string;
  public dayTodoId: string;

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase, private http: Http, private route: ActivatedRoute, public ds: DataService) {
    this.todoId = route.snapshot.paramMap.get('todoid');
    this.userId = route.snapshot.paramMap.get('userId');
    this.dayId  = route.snapshot.paramMap.get('dayId')
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
          console.log(this.todoData)
        })
      }
    })
  }

  completetask(){
    let currentTodoData = []
    let currentDayData = []
    this.currentTodo = this.db.object(`/families/${this.currentFamily}/users/${this.userId}/todos/${this.todoId}`, { preserveSnapshot: true });
    this.currentDayTodo =  this.db.object(`/families/${this.currentFamily}/currentWeek/days/${this.dayId}/todos/${this.dayTodoId}`, { preserveSnapshot: true });
    console.log(`/families/${this.currentFamily}/currentWeek/days/${this.dayId}/todos/${this.todoId}`)
    this.currentTodo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        currentTodoData.push({ key: snapshot.key, value: snapshot.val() })
      });
      console.log(currentTodoData)
    })
    this.currentDayTodo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        currentDayData.push({ key: snapshot.key, value: snapshot.val() })
      });
      console.log(currentTodoData)
    })
    this.currentTodo.set({
      'category': currentTodoData[0].value,
      'day':  currentTodoData[1].value,
      'description': currentTodoData[2].value,
      'relevance': currentTodoData[3].value,
      'status': true,
      'username': currentTodoData[5].value
    })
    console.log(`/families/${this.currentFamily}/currentWeek/days/${this.dayId}/todos/${this.dayTodoId}`)
    this.currentDayTodo.set({
      'category': currentDayData[0].value,
      'day':  currentDayData[1].value,
      'description': currentDayData[2].value,
      'relevance': currentDayData[3].value,
      'status': true,
      'username': currentDayData[5].value
    })
  }

  updateOnBothEnds(pUserTodo, pDayTodo) {
    let targets = []
    let currentTodoData = []
    let currentDayData = []
    targets.push(pUserTodo, pDayTodo)
    targets.forEach((o) => {
      o.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          o.push({ key: snapshot.key, value: snapshot.val() })
        });
      })
      o.currentTodo.set({
        'category': currentTodoData[0].value,
        'day':  currentTodoData[1].value,
        'description': currentTodoData[2].value,
        'relevance': currentTodoData[3].value,
        'status': true,
        'username': currentTodoData[5].value
      })
    })
  }
}
