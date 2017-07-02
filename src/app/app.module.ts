import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// models
import { User } from './models/user.model';
import { Week } from './models/week.model';
// components
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { RegisterComponent } from './components/register/register.component';
// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyAaVcA0wjZMDYdeXT6IRYInLbO4dYU6usE",
  authDomain: "homeaid-38548.firebaseapp.com",
  databaseURL: "https://homeaid-38548.firebaseio.com",
  projectId: "homeaid-38548",
  storageBucket: "",
  messagingSenderId: "124377704161"
}

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
