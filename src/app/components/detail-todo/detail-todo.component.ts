import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.scss'],
  providers: [AuthService]

})
export class DetailTodoComponent implements OnInit {
  public todoId: string;
  public userId: string;
  public usersArr: Array<any> = [];
  public users: FirebaseListObservable<any>;
  public loadedUsers: boolean = false;
  public currentTodo: FirebaseObjectObservable<any>;
  public currentDayTodo: FirebaseObjectObservable<any>;
  public todo: string;
  public uid: string;
  public currentFamily: string = '';
  public todoData: Array<any> = [];
  public dayId: string;
  public dayTodoId: string;
  public currentTodoData: Array<any> = [];
  public currentDayData: Array<any> = [];
  public pathUser: FirebaseListObservable<any>
  public userSelected: boolean = false;
  public currentUserTodoForRemove: FirebaseObjectObservable<any>;
  public newUserIdForTodo: string;
  public currentUserInfo:FirebaseObjectObservable<any>;
  public todoImg;

  constructor(
    private as: AuthService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    //private http: Http,
    private route: ActivatedRoute,
    //public ds: DataService,
    public location: Location
) {
    this.todoId = route.snapshot.paramMap.get('todoid');
    this.userId = route.snapshot.paramMap.get('id');
    this.dayId = route.snapshot.paramMap.get('dayId');
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
        })
      }
    })

    this.auth.authState.subscribe(res => {
      let props = this;
      if (res && res.uid) {
        props.currentFamily = res.uid;
        console.log('logged in');
        this.users = this.db.list(`/families/${props.currentFamily}/users`, { preserveSnapshot: true });
        this.users
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              if (props.loadedUsers === false && !(snapshot.key === this.userId)) {
                props.usersArr.push(
                  ({
                    key: snapshot.key,
                    value: snapshot.val()
                  })
                )
              }
            });
            this.currentTodoAndDayData();
            props.loadedUsers = true;
            //console.log('arr de usuarios',this.currentTodoData[1].value);
          })
      } else {
        console.log('user not logged in');
      }
    });
  }

  currentTodoAndDayData() {
    this.currentTodo = this.db.object(`/families/${this.currentFamily}/users/${this.userId}/todos/${this.todoId}`, { preserveSnapshot: true });
    this.currentDayTodo = this.db.object(`/families/${this.currentFamily}/currentWeek/days/${this.dayId}/todos/${this.dayTodoId}`, { preserveSnapshot: true });
    this.currentTodo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.currentTodoData.push({ key: snapshot.key, value: snapshot.val() })
      });
      console.log(this.currentTodoData[1].value);
      this.todoImg = this.currentTodoData[1].value;
     // this.assignProperties(this.currentTodoData)
    })
    this.currentDayTodo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.currentDayData.push({ key: snapshot.key, value: snapshot.val() })
      });
    })
  }

  completetask() {
    this.currentTodo.set({
      'category': this.currentTodoData[0].value,
      'categoryImg': this.currentTodoData[1].value,
      'day': this.currentTodoData[2].value,
      'description': this.currentTodoData[3].value,
      'nameUser': this.currentTodoData[4].value,
      'points': this.currentTodoData[5].value,
      'priority': this.currentTodoData[6].value,
      'relevance': this.currentTodoData[7].value,
      'relevanceBy': this.currentTodoData[8].value,
      'status': true,
      'userId': this.currentTodoData[10].value

    })
    this.currentDayTodo.set({
      'category': this.currentTodoData[0].value,
      'categoryImg': this.currentTodoData[1].value,
      'day': this.currentTodoData[2].value,
      'description': this.currentTodoData[3].value,
      'nameUser': this.currentTodoData[4].value,
      'points': this.currentTodoData[5].value,
      'priority': this.currentTodoData[6].value,
      'relevance': this.currentTodoData[7].value,
      'relevanceBy': this.currentTodoData[8].value,
      'status':  true,//cambiar [9]
      'userId': this.currentTodoData[10].value
    })
    this.location.back();
  }

  prioritytask() {
    //console.log(this.currentTodoData);
    this.currentTodo.set({
      'category': this.currentTodoData[0].value,
      'categoryImg': this.currentTodoData[1].value,
      'day': this.currentTodoData[2].value,
      'description': this.currentTodoData[3].value,
      'nameUser': this.currentTodoData[4].value,
      'points': this.currentTodoData[5].value,
      'priority': true,//cambiar [6]
      'relevance': this.currentTodoData[7].value,
      'relevanceBy': this.currentTodoData[8].value,
      'status': this.currentTodoData[9].value,
      'userId': this.currentTodoData[10].value
    })
    this.currentDayTodo.set({
      'category': this.currentTodoData[0].value,
      'categoryImg': this.currentTodoData[1].value,
      'day': this.currentTodoData[2].value,
      'description': this.currentTodoData[3].value,
      'nameUser': this.currentTodoData[4].value,
      'points': this.currentTodoData[5].value,
      'priority': true,//cambiar
      'relevance': this.currentTodoData[7].value,
      'relevanceBy': this.currentTodoData[8].value,
      'status': this.currentTodoData[9].value,
      'userId': this.currentTodoData[10].value
    })
    this.location.back();
  }


  selectUser(pUid) {
    this.newUserIdForTodo = pUid;
  //  console.log('selectedUser',this.userId);
    this.userSelected = true;

  }

  send() {
    let relevanceTodoForUser;
    let relevanceFirst = false;
    let currentUserId;
    let currentUserData: Array<any> = [];
    currentUserId = this.currentTodoData[10].value;

    //let currentTodoRemoved;
    if(this.userSelected){
      //console.log('ya seleccionaron usuario');
      for (var i = 0; i < this.usersArr.length; i++) {
        if (this.newUserIdForTodo == this.usersArr[i].key) {
          //path para pararle la tarea a alguien mas.
          this.pathUser = this.db.list(`/families/${this.currentFamily}/users/${this.newUserIdForTodo}/todos/`, { preserveSnapshot: true });

          this.currentUserTodoForRemove = this.db.object(`/families/${this.currentFamily}/users/${this.userId}/todos/${this.todoId}`, { preserveSnapshot: true });

          this.currentUserInfo = this.db.object(`/families/${this.currentFamily}/users/${currentUserId}`, { preserveSnapshot: true });
          this.currentUserInfo.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              currentUserData.push({ key: snapshot.key, value: snapshot.val() })
            });
          })

          relevanceTodoForUser = {
            "category":this.currentTodoData[0].value, //listo
            "categoryImg": this.currentTodoData[1].value,//listo
            "day":this.currentTodoData[2].value, //listo
            "description":this.currentTodoData[3].value, //listo
            "nameUser":this.usersArr[i].value.name, //nombre de la pp a la que le va
            "points":this.currentTodoData[6].value, // listo
            "priority":false, //listo
            "relevance":true, //listo
            "revelanceBy": currentUserData[2].value,//quien la releva.
            "status":this.currentTodoData[9].value,
            "userId": this.usersArr[i].key //nuevo id
          }
          console.log('@#@#@#@',relevanceTodoForUser)


          this.pathUser.push(relevanceTodoForUser);
          relevanceFirst = true;
          //path para cambiar el estado de tarea del usuario ACTUAL a none/borrarla.
          if(relevanceFirst){
            this.currentUserTodoForRemove.remove();
            this.location.back();
          }
        } else {
          console.log("select a user first please");

        }
      }
    }

  }

  assignProperties(pData: Array<any>) {
   /* pData.forEach((pObject) => {
      switch (pObject.key) {
        case 'name':
          this.userName = pObject.value
        break;
        case 'avatar':
          this.userAvatar = pObject.value
        break;
        case 'styles':
           this.fillAttr = pObject.value
           console.log("color", this.fillAttr)
      }
    })*/
  }

}
