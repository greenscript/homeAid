import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialogModule } from '@angular/material';
import { NewTodo } from '../../models/newTodo.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-createWeek-admin',
  templateUrl: './createWeek-admin.component.html',
  styleUrls: ['./createWeek-admin.component.scss'],
  providers: [DataService, AuthService]
})
export class CreateWeekAdminComponent implements OnInit {
  public allTodos = new Array;
  public todos;
  public day = 0;
  public actualDay = "";
  public days = [];
  public weekData: Array<any> = [];
  public currentWeek: FirebaseListObservable<any>;
  public currentTodos: FirebaseListObservable<any>;
  public uid: string;
  public currentDay: any;
  public currentDayIndex: number = 0;

  constructor(private http: Http, private ds: DataService, private db: AngularFireDatabase, private afa: AngularFireAuth) {}

  ngOnInit() {
    this.afa.authState.subscribe(res => {
      if (res.uid) {
        this.uid = res.uid;
        this.currentWeek = this.db.list(`/families/${this.uid}/currentWeek`, {preserveSnapshot: true});
        this.currentWeek.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
              this.weekData.push({key: snapshot.key, value: snapshot.val()})
          });
          console.log(this.weekData);
          this.days = this.weekData[0].value;
          this.currentDay = this.days[0].day;
          console.log(this.currentDay);
        })
      }
    })
  }

  next() {
    console.log(this.currentDay);
    this.currentDay = this.days[this.currentDayIndex = this.currentDayIndex + 1].day;
    if (this.currentDayIndex === 6) {
      this.currentDayIndex = 0;
    }

    this.getTodos(this.currentDayIndex)
  }

  back() {
    this.currentDay = this.days[this.currentDayIndex = this.currentDayIndex - 1].day;
    if (this.currentDayIndex === 0) {
      this.currentDayIndex = 6;
    }

    this.getTodos(this.currentDayIndex)
  }

  getTodos(pDayIndex) {
    let a = `/families/${this.uid}/currentWeek/${pDayIndex}/todos/`
    this.currentTodos = this.db.list(`/families/${this.uid}/currentWeek/days/${pDayIndex}/todos`, {
      query: {
        limitToLast: 20
      }
    });
  }
}
