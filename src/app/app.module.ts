import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';

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
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdChipsModule, MdTooltipModule, MdInputModule } from '@angular/material';
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
import { FamilyComponent } from './components/family/family.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MobileBarComponent } from './components/mobile-bar/mobile-bar.component';
import { DetailTodoComponent } from './components/detail-todo/detail-todo.component';
import { FamilyGoalComponent } from './components/family-goal/family-goal.component';
import { HeaderComponent } from './components/header/header.component';
import { DesktopBarComponent } from './components/desktop-bar/desktop-bar.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportComponent } from './components/report/report.component';
import { BackComponent } from './components/back/back.component';
import { FamilyRewardComponent } from './components/family-reward/family-reward.component';

// pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
// bootstrap
import { ModalModule } from 'ngx-bootstrap';
import { DatepickerModule } from 'angular2-material-datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
// asd
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { SwiperModule } from 'angular2-useful-swiper';



// services

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
  { path: 'menu/:id', component: MenuAdminComponent },
  { path: 'menu/:id/newUser', component: NewUserComponent },
  { path: 'menu/:id/createWeek', component: CreateWeekAdminComponent },
  { path: 'user/:id', component: ProfileUserComponent },
  { path: 'newTodo/:id/:day/:index', component: NewTodoComponent },
  { path: 'familyTodos/:id', component: FamilyComponent },
  { path: 'users', component: UsersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detailTodo/:id/:todoid/:dayId/:todoDayId', component: DetailTodoComponent },
  { path: 'familyGoal/:id', component: FamilyGoalComponent },
  { path: 'familyReward', component: FamilyRewardComponent }
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
    FamilyComponent,
    UsersComponent,
    DashboardComponent,
    MobileBarComponent,
    DetailTodoComponent,
    FamilyGoalComponent,
    HeaderComponent,
    DesktopBarComponent,
    ReportsComponent,
    ReportComponent,
    BackComponent,
    FamilyRewardComponent
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
    DatepickerModule,
    RoundProgressModule,
    Angular2FontawesomeModule,
    MomentModule,
    ToastModule.forRoot(),
    SwiperModule,
    ProgressbarModule.forRoot()

  ],
  providers: [{ provide: LOCALE_ID, useValue: "es-CR" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
