import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewTodo } from '../../models/newTodo.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
  providers: [AuthService]
})
export class NewTodoComponent implements OnInit {
  public users: FirebaseListObservable<any>;
  public selectedUser: FirebaseListObservable<any>;
  public userId: string = '';
  public usersdata: Array<any> = [];
  public currentFamily: string = '';
  public loadedUsers: boolean = false;
  categoryForModel;
  newTodoObj;
  //todosArray : NewTodo [];

  todos = [
    { category: "Pets", description: "Hacerle carinitos a Chanchillo." },
    { category: "Pets", description: "Dar de comer a pecas" },
    { category: "Acomodar", description: "Barrer popo de perritos" },
    { category: "Acomodar", description: "Ordenar sala" }
  ]

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase) {}

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
            console.log(snapshot.key)
            if (!(snapshot.key === '0') && (props.loadedUsers === false)) {
              props.usersdata.push(
                ({
                  key: snapshot.key,
                  value: snapshot.val()
                })
              )
              props.loadedUsers = true;
            }
          });
          console.log(props.usersdata)
        })
      } else {
        console.log('user not logged in');
      }
    });
  }

  addTodo(pvalue) {
    console.log('category', pvalue);
    console.log("arreglo", this.todos[0].description);

    // this.selectedUser = this.db.list(`/families/${this.userId}/users/todos/`, {preserveSnapshot: true});
    // this.selectedUser.push(this.newTodoObj);

    for (var index = 0; index < this.todos.length; index++) {
      if (pvalue == this.todos[index].description) {
        this.categoryForModel = this.todos[index].category;
        console.log('holi soy igual ', pvalue, ' y ', this.todos[index].description, 'y mi category es:', this.categoryForModel);

        this.newTodoObj = new NewTodo(this.categoryForModel, pvalue, false);


        console.log(this.todos);

      } else {
        // xD
        console.log('apesto a pedo');
      }
    }
  }

  selectUser(pUid) {
    console.log(pUid);
    this.userId = pUid;
    // esto de abajo es como agregar el todo a la base de datos
    // deberia de ir en la funcion addTodo
    this.selectedUser = this.db.list(`/families/${this.currentFamily}/users/${this.userId}/todos/`, {preserveSnapshot: true});
    this.selectedUser.push({name: 'asd', description: 'asd', category: 'asd'});
  }
}
