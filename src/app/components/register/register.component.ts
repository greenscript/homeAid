import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Family } from '../../models/family.model';
import { User } from '../../models/user.model';
import { Week } from '../../models/week.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService, Validators]
})

export class RegisterComponent implements OnInit {

  public myform: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public password: FormControl;
  public repeatPassword: FormControl;
  public error: boolean = false;
  public matchError: string;

  constructor(public auth: AuthService, public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    // ejecuta las funciones de la creacion del form
    this.createFormControls();
    this.createForm();
  }

  // crea los form controls con sus respectivas validaciones
  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.repeatPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }
  // crea el formGroup o form y le añade sus form controls
  createForm() {
    this.myform = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
    });
  }

  register() {
    // si el form esta validado
    if (this.myform.valid) {
      // si la repeticion del password coincide
      if(this.password.value === this.repeatPassword.value) {
        // llama al serivio AuthService y ejecuta la funcion emailSignUp
        // pasando como parametros lo necesario para crear una familia
        // pasando como un usuario en arreglo el usuario admin, o usuario 0 de la familia
        // y habilitando la posibilidad de pushear nuevos usuarios a firebase
        this.auth.emailSignUp(this.email.value, this.password.value, this.lastName.value);
        this.toastr.success('Redireccionando...', 'Bienvenidos!')
      } else {
        // las password no coincidieron y activa el flag de error y contenido del error
        this.error = true;
        this.matchError = `Passwords don't match.`;
      }
    }
  }
}
