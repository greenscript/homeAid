import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'app-family-goal',
  templateUrl: './family-goal.component.html',
  styleUrls: ['./family-goal.component.scss'],
  providers: [AuthService]
})

export class FamilyGoalComponent implements OnInit {
  @Input() gTitle;
  @Input() gdescriptionGoal;
  public adminId: string;
  public currentWeek: FirebaseListObservable<any>;
  public path;
  public famData : Array<any> = [];
  public loadedUsers: boolean = false;


  constructor(
    private as: AuthService,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router,
    public ar: ActivatedRoute
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.ar.params.subscribe((params: Params) => {
      this.adminId = params['adminId'];
    });

    console.log('adminId ',this.adminId);
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('logged in');
        this.path = this.db.list(`/families/${res.uid}/currentWeek/goals`, { preserveSnapshot: true });
        this.path.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            if (!this.loadedUsers) {
              this.famData.push({ key: snapshot.key, value: snapshot.val() })
            }
          });
          this.loadedUsers = true;
        })
      } else {
        console.log('user not logged in from goal component');
      }
    });
  }

  sendFamGoal(ptitle, pdescript) {
    let goaldObj;
    let goalAdded: boolean = false;
    console.log('famData', this.famData);
    if(this.famData.length > 1){
      this.toastr.warning('Solamente puedes tener un premio por semana!', 'Warning');
    }else if(ptitle == null && pdescript == null){
      console.log('empty fields');
      this.toastr.error('Tienes que llenar todos los campos!', 'Error');
    } else {
      goaldObj = {
        "title": ptitle,
        "description": pdescript
      }
      this.path.push(goaldObj);
      goalAdded = true;
      this.toastr.success('Premio creado exitosamente!', 'Success');
      console.log('SE TUVO QUE HABER CREADO EL PREMIO!');

    }
  }

}
