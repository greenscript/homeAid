import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
    providers: [AuthService, Validators]
})
export class NewUserComponent implements OnInit, OnChanges {
  public users: FirebaseListObservable<any>;
  public userform: FormGroup;
  public userName: FormControl;
  public birthdate: FormControl;
  public avatars: Array<any> = [
    {src: 'assets/i-22.png'},
    {src: 'assets/i-24.png'},
    {src: 'assets/i-23.png'}
  ]

  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase) {}

  ngOnChanges() {
    // se ejecuta cada vez que algo cambia en el componente, para la que haga la funcionalidad de
    // escoger el avatar, le podria funcionar, si no tranqui es solo una sugerencia
    // por que digamos que cada vez que el usuario clicke el avatar va a pasar a activo
    // entonces se ejecutaria esta funcion por el cambio en el componente
  }

  // crea los form controls
  createFormControls() {
    this.userName = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);
    this.birthdate = new FormControl('', Validators.required);
  }
  // crea el form y añade los controles al mismo
  createForm() {
    this.userform = new FormGroup({
      userName: this.userName,
      birthdate: this.birthdate
    });
  }

  ngOnInit() {
    // ejecuta las funciones de la creacion del form
    this.createFormControls();
    this.createForm();
    // metodo del AuthService que se encarga de reconocer si el usuario esta loggeado
    // si lo esta, jala los usuarios de esa familia
    // el res y res.uid, son el response de la promesa que se crea con el metodo suscribe
    // el res en este caso seria el usuario desde firebase y el res.uid, su id
    // si existen ambos significa que el usuario esta loggeado.
    // ${res.uid} esto, jala el id en modo de string, el ${valor} es un selector de es6
    // de javascript, que se llama template string, como el uid del usuario cambia, se usa este metodo
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('logged in');
        this.users = this.db.list(`/families/${res.uid}/users/`, {preserveSnapshot: true});
      } else {
        console.log('user not logged in');
      }
    });
  }

  createUser() {
    // si el form esta validado, agrega el nuevo usuario
    if (this.userform.valid) {
      this.users.push(new User(this.userName.value, 'assets/i-22.png', 0, [], [], this.birthdate.value));
    }
  }
}
