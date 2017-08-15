import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public error: string = '';

  constructor(private as: AuthService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.as.loginWithEmail(this.email.value, this.password.value).then((error) => {
        if (error) {
          this.error = error.message;
        }
      })
    }
  }

  facebookSignUp() {
    this.as.facebookLogin();
  }

  googleSignUp() {
    this.as.googleLogin();
  }
}
