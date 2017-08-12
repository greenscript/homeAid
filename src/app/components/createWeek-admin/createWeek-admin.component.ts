import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
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
export class CreateWeekAdminComponent implements OnInit, OnChanges {
  @Input() currentDay: any;
  public day = 0;
  public actualDay = "";
  public days = [];
  public weekData: Array<any> = [];
  public currentWeek: FirebaseListObservable<any>;
  public currentTodos: FirebaseListObservable<any>;
  public uid: string;
  public currentDayIndex: number = 0;
  public pastDweller: boolean;
  public routeId: string;
  public curr: any = new Date;
  public first: any = this.curr.getDate() - this.curr.getDay();
  public last: any = this.first + 6;
  public firstday: any = new Date(this.curr.setDate(this.first)).toUTCString();
  public lastday: any = new Date(this.curr.setDate(this.last)).toUTCString();
  public goal: string;


  constructor(
    private http: Http,
    private ds: DataService,
    private db: AngularFireDatabase,
    private afa: AngularFireAuth,
    public af: AngularFireAuth,
    public ar: ActivatedRoute,
    public as: AuthService) {
      this.routeId = ar.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.afa.authState.subscribe(res => {
      if (res.uid) {
        this.uid = res.uid;
        this.currentWeek = this.db.list(`/families/${this.uid}/currentWeek`, { preserveSnapshot: true });
        this.currentWeek.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.weekData.push({ key: snapshot.key, value: snapshot.val() })
          });
          this.days = this.as.getWeekDays(this.firstday, this.lastday)
          this.currentDay = this.days[0].day;
          console.log(this.days)
        })
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  next() {
    if (this.currentDayIndex == 6) {
      this.currentDayIndex = -1;
    } else if (this.currentDayIndex === 7) {
      this.currentDayIndex = -1;
    }
    this.currentDay = this.days[this.currentDayIndex = this.currentDayIndex + 1].day;
    this.checkDate()
    this.getTodos(this.currentDayIndex)
  }

  back() {
    if (this.currentDayIndex === -1 || this.currentDayIndex === 0) {
      this.currentDayIndex = 7;
    }
    this.currentDay = this.currentDayIndex > 0 ? this.days[this.currentDayIndex = this.currentDayIndex - 1].day : this.days[0].day

    this.checkDate()
    this.getTodos(this.currentDayIndex)
  }

  checkDate() {
    console.log('asd')
    let actualDate = new Date()
    let currentDay = new Date(this.currentDay)
    this.pastDweller = currentDay < actualDate ? true : false
  }

  getTodos(pDayIndex) {
    this.currentTodos = this.db.list(`/families/${this.uid}/currentWeek/days/${pDayIndex}/todos`, {
      query: {
        limitToLast: 20
      }
    });
  }
}
