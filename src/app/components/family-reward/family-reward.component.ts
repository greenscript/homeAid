import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialogModule } from '@angular/material';
import { NewTodo } from '../../models/newTodo.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-family-reward',
  templateUrl: './family-reward.component.html',
  styleUrls: ['./family-reward.component.scss'],
  providers: [AuthService]
})
export class FamilyRewardComponent implements OnInit {
  @Input() currentDay: any;
  public day = 0;
  public days = [];
  public routeId: string;
  public weekData: Array<any> = [];
  public currentWeek: FirebaseListObservable<any>;
  public uid: string;
  public currentDayIndex: number = 0;
  public curr: any = new Date;
  public first: any = this.curr.getDate() - this.curr.getDay();
  public last: any = this.first + 6;
  public firstday: any = new Date(this.curr.setDate(this.first)).toUTCString();
  public lastday: any = new Date(this.curr.setDate(this.last)).toUTCString();

  public pastDays = 0;
  public percentWeek = 0;
  public current = 0;
  public d = new Date()
  public currDay = this.d.getDay();

  constructor(
    private http: Http,
    private db: AngularFireDatabase,
    private afa: AngularFireAuth,
    public af: AngularFireAuth,
    public ar: ActivatedRoute,
    public as: AuthService
  ) {
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
          var getAllDays = this.weekData[0].value;
          console.log("fuera", getAllDays);
          for (var i = 0; i < getAllDays.length; i++) {
            if (getAllDays[i] < this.currDay) {
              this.pastDays += 1;
              this.percentWeek = (100 / 7);
            }
          }
          this.current = this.percentWeek * this.pastDays;
          console.log("percentweek", this.percentWeek);
          console.log("pastDays", this.pastDays);
          console.log("current", this.current);
          // let a = Object.values(this.weekData.shift())
          // let b = a.splice(1, 1).shift()
          // this.days = b
          // if (this.days.length > 0) {
          //   this.currentDay = this.days.shift().day;
          // }
        })
      }
    })

  }
}
