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
  uid:string;

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase, private http: Http, private route: ActivatedRoute, public ds: DataService) {
    this.todoId = route.snapshot.paramMap.get('todoid');
    this.uxId = route.snapshot.paramMap.get('uxid');

    console.log('id del todo',this.todoId , 'id del ux',this.uxId );
  }

  ngOnInit() {
  }
}
