import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-family-goal',
  templateUrl: './family-goal.component.html',
  styleUrls: ['./family-goal.component.scss'],
  providers: [AuthService, Validators]
})

export class FamilyGoalComponent implements OnInit {
  public adminId: string;
  public currentWeek: FirebaseListObservable<any>;
  public path;
  public famData: Array<any> = [];
  public loadedUsers: boolean = false;
  public awardForm: FormGroup;
  public title: FormControl;
  public content: FormControl;


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
      this.adminId = ar.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();


    console.log('adminId ', this.adminId);
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

  createFormControls() {
    this.title = new FormControl('', Validators.required);
    this.content = new FormControl('', Validators.required);
  }
  // crea el formGroup o form y le añade sus form controls
  createForm() {
    this.awardForm = new FormGroup({
      title: this.title,
      content: this.content
    });
  }


  sendFamGoal(ptitle, pdescript) {
    console.log(this.awardForm.valid)
    if (this.awardForm.valid) {
      let goaldObj;
      let goalAdded: boolean = false;
      if (this.famData.length > 1) {
        this.toastr.warning('Solamente puedes tener un premio por semana!', 'Warning');
      } else {
        goaldObj = {
          "title": this.title.value,
          "description": this.content.value
        }
        this.path.push(goaldObj);
        goalAdded = true;
        this.toastr.success('Premio creado exitosamente!', 'Success');
        console.log('SE TUVO QUE HABER CREADO EL PREMIO!');

      }
    }
  }
}
