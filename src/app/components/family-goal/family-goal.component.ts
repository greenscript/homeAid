import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
  public path;

  constructor(public ar: ActivatedRoute, private as: AuthService,
    private ds: DataService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    private http: Http) {
    this.uid = ar.snapshot.paramMap.get('uid');
  }

  ngOnInit() {
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('logged in');
        this.path = this.db.list(`/families/${res.uid}/currentWeek/goals/`, { preserveSnapshot: true });
      } else {
        console.log('user not logged in');
      }
    });
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
      this.currentWeek = this.db.list(`/families/${this.uid}/currentWeek/goals/`, { preserveSnapshot: true });
      this.currentWeek.push(goaldObj);
      console.log(goaldObj);

      // /families/uid/currenWeek/goals
    }
  }

}
