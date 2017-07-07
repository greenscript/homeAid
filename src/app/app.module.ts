import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// models
import { User } from './models/user.model';
import { Week } from './models/week.model';
import { NewTodo } from './models/newTodo.model';
// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//angular material ui
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdChipsModule, MdTooltipModule } from '@angular/material';
// components
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { CreateWeekAdminComponent } from './components/createWeek-admin/createWeek-admin.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
// pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
// bootstrap
import { ModalModule } from 'ngx-bootstrap';
import { DatepickerModule } from 'angular2-material-datepicker'

export const firebaseConfig = {
  apiKey: "AIzaSyAaVcA0wjZMDYdeXT6IRYInLbO4dYU6usE",
  authDomain: "homeaid-38548.firebaseapp.com",
  databaseURL: "https://homeaid-38548.firebaseio.com",
  projectId: "homeaid-38548",
  storageBucket: "",
  messagingSenderId: "124377704161"
}

export const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuAdminComponent },
  { path: 'createWeek', component: CreateWeekAdminComponent },
  { path: 'user', component: ProfileUserComponent },
  { path: 'newTodo', component: NewTodoComponent },
  { path: 'newux', component: NewUserComponent },
  { path: 'create-user', component: CreateUserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    RegisterComponent,
    LoginComponent,
    MenuAdminComponent,
    ProfileUserComponent,
    CreateWeekAdminComponent,
    NewTodoComponent,
    NewUserComponent,
    CapitalizePipe,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdChipsModule,
    MdTooltipModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
