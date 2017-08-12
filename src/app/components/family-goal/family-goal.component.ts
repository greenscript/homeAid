import { Component, OnInit, Input } from '@angular/core';
import { NewTodo } from '../../models/newTodo.model';
import { CreateWeekAdminComponent } from '../../components/createWeek-admin/createWeek-admin.component';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-family-goal',
  templateUrl: './family-goal.component.html',
  styleUrls: ['./family-goal.component.scss']
})
export class FamilyGoalComponent implements OnInit {
  @Input() gTitle;
  @Input() gdescriptionGoal;
  public uid: string;
  public currentWeek: FirebaseListObservable<any>;

  constructor(public ar: ActivatedRoute, private as: AuthService,
    private ds: DataService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    private http: Http) {
    this.uid = ar.snapshot.paramMap.get('id');

  }

  ngOnInit() {
  }

  sendFamGoal(gTitle, gdescriptionGoal) {
    let goaldObj;

    if (gTitle == null && gdescriptionGoal == null) {
      console.log('empty fields');
      //validar.
    } else {
      console.log('!!!!', gTitle, ' - ', gdescriptionGoal);
      goaldObj = {
        "title": this.gTitle,
        "description": this.gdescriptionGoal
      }
      // this.currentWeek = this.db.list(`/families/${this.currentFamily}/currentWeek/goals/`, { preserveSnapshot: true });
      // this.currentWeek.push({ username: this.userId, description: pvalue, category: this.categoryForModel, status: false, relevance: 'none', day: this.currentDayIn, points: this.points });
      // /families/uid/currenWeek/goals
    }
  }

}
