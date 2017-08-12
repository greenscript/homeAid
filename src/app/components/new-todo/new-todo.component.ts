import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewTodo } from '../../models/newTodo.model';
import { CreateWeekAdminComponent } from '../../components/createWeek-admin/createWeek-admin.component';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
  providers: [AuthService, DataService]
})
export class NewTodoComponent implements OnInit {
  public uid: string;
  public users: FirebaseListObservable<any>;
  public selectedUser: FirebaseListObservable<any>;
  public currentWeek: FirebaseListObservable<any>;
  public selectedDay: FirebaseListObservable<any>;
  public userId: string = '';
  public usersdata: Array<any> = [];
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  public categoryForModel;
  public newTodoObj;
  public userName;
  public currentDayIn;
  public currentDay;
  public points;
  public userSelected: boolean = false;
  public error: boolean = false;
  public errorMsg: string;


  //todosArray : NewTodo [];

  todos = [
    { category: "Acomodar", description: "Alistar el comedor.", status: false, relevance: 'none', points: 1 },
    { category: "Acomodar", description: "Doblar ropa.", status: false, relevance: 'none', points: 2 },
    { category: "Acomodar", description: "Planchar ropa.", status: false, relevance: 'none', points: 4 },
    { category: "Acomodar", description: "Ordenar baños.", status: false, relevance: 'none', points: 3 },
    { category: "Acomodar", description: "Ordenar cocinar.", status: false, relevance: 'none', points: 3 },
    { category: "Acomodar", description: "Ordenar sala.", status: false, relevance: 'none', points: 3 },
    //Cat: limpiar.
    { category: "Limpiar", description: "Barrer.", status: false, relevance: 'none', points: 1 },
    { category: "Limpiar", description: "Pasar el palo piso.", status: false, relevance: 'none', points: 2 },
    { category: "Limpiar", description: "Lavar platos.", status: false, relevance: 'none', points: 2 },
    { category: "Limpiar", description: "Aspirar la alfombra y muebles.", status: false, relevance: 'none', points: 4 },
    { category: "Limpiar", description: "Limpiar el inodoro y la ducha.", status: false, relevance: 'none', points: 4 },
    { category: "Limpiar", description: "Sacar la basura.", status: false, relevance: 'none', points: 1 },
    { category: "Limpiar", description: "Limpiar Jardin.", status: false, relevance: 'none', points: 4 },

    //Cat: Cocinar.
    { category: "Cocinar", description: "Desayuno.", status: false, relevance: 'none', points: 5 },
    { category: "Cocinar", description: "Almuerzo.", status: false, relevance: 'none', points: 5 },
    { category: "Cocinar", description: "Merienda.", status: false, relevance: 'none', points: 5 },
    { category: "Cocinar", description: "Cena.", status: false, relevance: 'none', points: 5 },
    //Cat: Mascotas.
    { category: "Mascotas", description: "Alimentar la mascota.", status: false, relevance: 'none', points: 1 },
    { category: "Mascotas", description: "Bañar la mascota.", status: false, relevance: 'none', points: 3 },
    { category: "Mascotas", description: "Pasear a la mascota.", status: false, relevance: 'none', points: 3 },
    { category: "Mascotas", description: "Limpiar la casa de la mascota.", status: false, relevance: 'none', points: 2 },
    { category: "Mascotas", description: "Limpiar el popo de la mascota.", status: false, relevance: 'none', points: 1 },
    //Cat: Personal.
    { category: "Personal", description: "Limpiar el cuarto.", status: false, relevance: 'none', points: 5 },
    { category: "Personal", description: "Acomodar el cuarto.", status: false, relevance: 'none', points: 3 },
    { category: "Personal", description: "Lavar y secar ropa sucia.", status: false, relevance: 'none', points: 1 },
    { category: "Personal", description: "Tender la cama.", status: false, relevance: 'none', points: 1 },
    { category: "Personal", description: "Hacer tareas academicas.", status: false, relevance: 'none', points: 5 }
  ]

  constructor(
    private as: AuthService,
    private ds: DataService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    private http: Http,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.currentDayIn = params['index'];
      this.currentDay = params['day'];
      this.uid = params['id'];
      console.log("@#@#@#@#@# CURRENT DAY", this.currentDayIn);
    });

    console.log(this.ds.regularUsers);

    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        props.currentFamily = res.uid;
        console.log('logged in');
        this.users = this.db.list(`/families/${props.currentFamily}/users/`, { preserveSnapshot: true });
        this.users
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              console.log(snapshot.key)
              if (!(snapshot.key === '0') && (props.loadedUsers === false)) {
                props.usersdata.push(
                  ({
                    key: snapshot.key,
                    value: snapshot.val()
                  })
                )
              }
            });
            props.loadedUsers = true;
          })
      } else {
        console.error('user not logged in');
      }
    });
  }

  selectUser(pUid) {
    this.userId = pUid;
    this.userSelected = true;
  };

  addTodo(pvalue, userId) {
    for (var index = 0; index < this.todos.length; index++) {
      if (pvalue == this.todos[index].description) {
        this.categoryForModel = this.todos[index].category;
        this.points = this.todos[index].points;

        if (this.userSelected) {
          this.selectedUser = this.db.list(`/families/${this.currentFamily}/users/${this.userId}/todos/`, { preserveSnapshot: true });
          this.selectedUser.push({ username: this.userId, description: pvalue, category: this.categoryForModel, status: false, relevance: 'none', day: this.currentDayIn, points:this.points });
          this.selectedDay = this.db.list(`/families/${this.currentFamily}/currentWeek/days/${this.currentDayIn}/todos/`, { preserveSnapshot: true });
          this.selectedDay.push({ username: this.userId, description: pvalue, category: this.categoryForModel, status: false, relevance: 'none', day: this.currentDayIn, points:this.points });
        } else {
          this.error = true;
          this.errorMsg = 'Please select a user first'
        }
      } else {
        console.log('todo didnt made any match with a todo of the local object.');
      }
    }
  }
}
