import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { Http } from '@angular/http';
//import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-family-goal',
  templateUrl: './family-goal.component.html',
  styleUrls: ['./family-goal.component.scss'],
  providers: [AuthService]
})

export class FamilyGoalComponent implements OnInit {
  @Input() gTitle;
  @Input() gdescriptionGoal;
  public uid: string;
  public currentWeek: FirebaseListObservable<any>;
  public path;

  constructor(
    private as: AuthService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    //public toastr: ToastsManager,
    //vcr: ViewContainerRef,
    private router: Router,
    public ar: ActivatedRoute
    //private http: Http,

) {
      //fam_id:
    this.uid = ar.snapshot.paramMap.get('famid');
  }

  ngOnInit() {
    console.log('fm id',this.uid);
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('logged in');
        this.path = this.db.list(`/families/${res.uid}/currentWeek/goals`, { preserveSnapshot: true });
      } else {
        console.log('user not logged in from goal component');
      }
    });
    /*this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('logged in');
        this.path = this.db.list(`/families/${res.uid}/currentWeek/goals/`, { preserveSnapshot: true });
      } else {
        console.log('user not logged in');
      }
    });*/
  }

  sendFamGoal(ptitle, pdescript) {
    let goaldObj;
  //  let title;
  //  let descr;

    if (ptitle == null && pdescript == null) {
      console.log('empty fields');
    } else {
      //console.log('!!!!', gTitle, ' - ', gdescriptionGoal);
      goaldObj = {
        "title": ptitle,
        "description": pdescript
      }
    this.currentWeek = this.db.list(`/families/${this.uid}/currentWeek/goals/`, { preserveSnapshot: true });
    this.currentWeek.push(goaldObj);
      //console.log('objeto',goaldObj , ' y parametros', ptitle ,' ',pdescript);
      console.log('SE TUVO QUE HABER CREADO EL PREMIO!');


      // /families/uid/currenWeek/goals
    }
  }

}
