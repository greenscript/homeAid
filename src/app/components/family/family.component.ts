import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialogModule } from '@angular/material';
import { User } from '../../models/user.model';
import { NewTodo } from '../../models/newTodo.model';
import { NewTodoComponent } from '../../components/new-todo/new-todo.component';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
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
  public users: FirebaseListObservable<any>;
  public selectedUser: FirebaseListObservable<any>;
  public userId: string = '';
  public tododata: Array<any> = [];
  public todosView: Array<any> = [];
  public usersdata: Array<any> = [];
  public userdata: Array<Object> = [];
  public currentWeek: FirebaseListObservable<any>;
  public currentTodos: FirebaseListObservable<any>;
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  public currentDay: any;
  public weekData: Array<any> = [];
  public currentDayIndex: number = 0;
  userName;
  public day = 0;
  public days = [];
  public actualDay = "";

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
            this.getDay();
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
              console.log(props.userdata)
              props.assignProperties(props.userdata)
            });
            this.getDay();
          })
      } else {
        console.log('user not logged in');
      }
    });
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
          console.log("weekData ", this.weekData);
          this.days = this.weekData[0].value;
          this.currentDay = this.days[0].day;
          console.log("currentDay ", this.currentDay);
          this.getTodos(this.actualDay);
          this.getTodos(this.currentDayIndex)
        })
      }
    })
  }

  selectUser(pUid) {
    console.log("select: " + pUid);
    this.userId = pUid;
  }
  next() {
    console.log(this.currentDay);
    this.currentDay = this.days[this.currentDayIndex = this.currentDayIndex + 1].day;
    if (this.currentDayIndex === 6) {
      this.currentDayIndex = 0;
    }

    this.getTodos(this.currentDayIndex)
  }

  back() {
    this.currentDay = this.days[this.currentDayIndex = this.currentDayIndex - 1].day;
    if (this.currentDayIndex === 0) {
      this.currentDayIndex = 6;
    }

    this.getTodos(this.currentDayIndex)
  }

  getTodos(day) {
    this.todosView = [];
    //Nota: El nombre del Día tiene que estar en Mayuscaula, tal como sale en el array days 
    //Si no aparecera []
    for (var i in this.days) {
      console.log("hellos");
      if (this.days[i].day == this.currentDayIndex) {
        this.todosView.push(this.days[i])
      }
      // if (this.days[i].value.currentDay == this.days[this.currentDay].this.todos.description)
      //   this.todosView.push(this.days[i])
    }
    console.log(this.todosView);
    console.log("jd", this.days[i].currentDayIndex);


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
