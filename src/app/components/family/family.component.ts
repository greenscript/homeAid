import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../models/user.model';
import { NewTodo } from '../../models/newTodo.model';
import { NewTodoComponent } from '../../components/new-todo/new-todo.component';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  providers: [AuthService, DataService]
})
export class FamilyComponent implements OnInit {
  allTodos = new Array;
  public users: FirebaseListObservable<any>;
  public todos: FirebaseListObservable<any>;
  public selectedUser: FirebaseListObservable<any>;
  public userId: string = '';
  public tododata: Array<any> = [];
  public todosView: Array<any> = [];
  public usersdata: Array<any> = [];
  public userdata: Array<Object> = [];
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  userName;
  day = 0;
  days = [
    { "name": "Lunes" },
    { "name": "Martes" },
    { "name": "Miércoles" },
    { "name": "Jueves" },
    { "name": "Viernes" },
    { "name": "Sábado" },
    { "name": "Domingo" },
  ];
  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase, private route: ActivatedRoute, public ds: DataService) {
  }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        props.currentFamily = res.uid;
        console.log('logged in');
        this.users = this.db.list(`/families/${props.currentFamily}/users`, { preserveSnapshot: true });
        this.users
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              if (!(snapshot.key === '0') && (props.loadedUsers === false)) {
                props.usersdata.push(
                  ({
                    key: snapshot.key,
                    value: snapshot.val()
                  })
                )
              }
            });
            console.log("usersdata ", props.usersdata);
            console.log("tododata ", props.tododata);
            props.loadedUsers = true;
          })
      } else {
        console.log('user not logged in');
      }
    });
  }

  getUser() {
    this.ds.allUsers();
    console.log(this.ds.allUsers());
    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        this.selectedUser = this.db.list(`/families/${props.currentFamily}/users/${props.userId}`, { preserveSnapshot: true });
        this.selectedUser
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              console.log(props.userdata)
              props.userdata.push({
                key: snapshot.key,
                value: snapshot.val()
              })
              // llama a la funcion assignProperties
              console.log(props.userdata)
              props.assignProperties(props.userdata)
            });
          })
      } else {
        console.log('user not logged in');
      }
    });
  }

  selectUser(pUid) {
    console.log("select: " + pUid);
    this.userId = pUid;
  }
  next() {
    this.day += 1;
    if (this.day == 7)
      this.day = 0

    this.getTodos(this.day)
  }

  back() {
    this.day -= 1;
    console.log(this.day);

    if (this.day == -1)
      this.day = 6

    this.getTodos(this.day)
  }

  getTodos(day) {
    var todosView = new Array;
    for (var i in this.allTodos) {
      if (this.allTodos[i].day == this.days[this.day].name)
        todosView.push(this.allTodos[i])
    }

  }

  assignProperties(pData: Array<any>) {
    // recibe como parametro un array
    pData.forEach((pObject) => {
      // si existe la propiedad nombre en los datos del usuario sacados de firebase
      if (pObject.key === 'name') {
        // se le asigna el nombre a adminName
        // esto para tener el nombre o apellido de la familia y mostrarlo en la vista
        console.log(pObject.value);
        this.userName = pObject.value
      }
    })
  }

}
