import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// models
import { User } from './models/user.model';
import { Week } from './models/week.model';
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
import { CreateWeekAdminComponent } from './components/createWeek-admin/createWeek-admin.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { NewUserComponent } from './components/new-user/new-user.component';

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
  { path: 'admin', component: CreateWeekAdminComponent },
  { path: 'newTodo', component: NewTodoComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    RegisterComponent,
    LoginComponent,
    MenuAdminComponent,
    CreateWeekAdminComponent,
    NewTodoComponent,
    NewUserComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
