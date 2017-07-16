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
    { category: "Acomodar", description: "Alistar el comedor.",status: false, relevance: 'none'},
    { category: "Acomodar", description: "Doblar ropa.",status: false, relevance: 'none'},
    { category: "Acomodar", description: "Planchar ropa.",status: false, relevance: 'none'},
    { category: "Acomodar", description: "Ordenar baños.",status: false, relevance: 'none'},
    { category: "Acomodar", description: "Ordenar cocinar.",status: false, relevance: 'none'},
    { category: "Acomodar", description: "Ordenar sala.",status: false, relevance: 'none'},
    //Cat: limpiar.
    { category: "Limpiar", description: "Barrer.",status: false, relevance: 'none'},
    { category: "Limpiar", description: "Pasar el palo piso.",status: false, relevance: 'none'},
    { category: "Limpiar", description: "Lavar platos.",status: false, relevance: 'none'},
    { category: "Limpiar", description: "Aspirar la alfombra y muebles.",status: false, relevance: 'none'},
    { category: "Limpiar", description: "Limpiar el inodoro y la ducha.",status: false, relevance: 'none'},
    { category: "Limpiar", description: "Sacar la basura.",status: false, relevance: 'none'},
    //Cat: Cocinar.
    { category: "Cocinar", description: "Desayuno.",status: false, relevance: 'none'},
    { category: "Cocinar", description: "Almuerzo.",status: false, relevance: 'none'},
    { category: "Cocinar", description: "Merienda.",status: false, relevance: 'none'},
    { category: "Cocinar", description: "Cena.",status: false, relevance: 'none'},
    //Cat: Mascotas.
    { category: "Mascotas", description: "Alimentar la mascota.",status: false, relevance: 'none'},
    { category: "Mascotas", description: "Bañar la mascota.",status: false, relevance: 'none'},
    { category: "Mascotas", description: "Pasear a la mascota.",status: false, relevance: 'none'},
    { category: "Mascotas", description: "Limpiar la casa de la mascota.",status: false, relevance: 'none'},
    { category: "Mascotas", description: "Limpiar las necesidades de la mascota.",status: false, relevance: 'none'},
    //Cat: Personal.
    { category: "Personal", description: "Limpiar el cuarto.",status: false, relevance: 'none'},
    { category: "Personal", description: "Acomodar el cuarto.",status: false, relevance: 'none'},
    { category: "Personal", description: "Lavar y secar ropa sucia.",status: false, relevance: 'none'},
    { category: "Personal", description: "Tender la cama.",status: false, relevance: 'none'},
    { category: "Personal", description: "Hacer tareas academicas.",status: false, relevance: 'none'},
    { category: "Personal", description: "Planchar y doblar ropa.",status: false, relevance: 'none'},

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
            }
          });
          console.log(props.usersdata)
          props.loadedUsers = true;
        })
      } else {
        console.log('user not logged in');
      }
    });
  }

  addTodo(pvalue) {
    console.log('category', pvalue);
    console.log("arreglo", this.todos[0].description);

    for (var index = 0; index < this.todos.length; index++) {
      if (pvalue == this.todos[index].description) {
        this.categoryForModel = this.todos[index].category;
        console.log('holi soy igual ', pvalue, ' y ', this.todos[index].description, 'y mi category es:', this.categoryForModel);

        //this.newTodoObj = new NewTodo(this.categoryForModel, pvalue, false);
      //  console.log(this.todos);

      } else {
        // xD
        // dejelo tirarse pedos att -mbolanosc
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
    // en vez de este objeto, iria el new Todo(parametros)
    this.selectedUser.push({name: 'asd', description: 'asd', category: 'asd'});
  }
}
