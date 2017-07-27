import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.scss'],
  providers: [DataService, AuthService]

})
export class DetailTodoComponent implements OnInit {
  todoId;
  uxId;
  currentTodo;
  todo: string;
  uid: string;
  public currentFamily: string = '';
  public todoData: Array<any> = [];
  todoCompleted;






  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase, private http: Http, private route: ActivatedRoute, public ds: DataService) {
    this.todoId = route.snapshot.paramMap.get('todoid');
    this.uxId = route.snapshot.paramMap.get('uxid');

    console.log('id del ux', this.uxId);
    //'id del todo', this.todoId,
  }

  ngOnInit() {
    //scar information
    let props = this;
    this.auth.authState.subscribe(res => {
      if (res.uid) {
        this.currentTodo = this.db.list(`/families/${res.uid}/users/${props.uxId}/todos/${props.todoId}`, { preserveSnapshot: true }); this.currentTodo.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.todoData.push({ key: snapshot.key, value: snapshot.val() })
          });
        })
      }
    })
  } //end of ng init.

  completetask(){
    console.log('got in');
    let props = this;
    this.auth.authState.subscribe(res => {
      if (res.uid) {
        this.currentTodo = this.db.list(`/families/${res.uid}/users/${props.uxId}/todos/${props.todoId}`, { preserveSnapshot: true }); this.currentTodo.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.todoData.push({ key: snapshot.key, value: snapshot.val() })
          });
        })
        console.log('status of the task',this.todoData);
        this.todoCompleted = this.todoData[4].value.status; //status
        console.log(this.todoCompleted);
      }
    })
  }
}

//1tener la info y imprimir datos.
//2. el del boton para cambiar el estado.
