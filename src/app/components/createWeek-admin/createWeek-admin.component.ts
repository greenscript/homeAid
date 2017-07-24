import { Component, OnInit, OnChanges } from '@angular/core';
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
  allTodos = new Array;
  todos;
  day = 0;
  actualDay = "";
  days = [];

  public weekData: Array<any> = [];
  public currentWeek: FirebaseListObservable<any>;
  public uid: string;
  public currentDay: any;
  public currentDayIndex: number = 0;

  constructor(private http: Http, private ds: DataService, private db: AngularFireDatabase, private afa: AngularFireAuth) {
    this.loadData('../assets/data/todos.json');
  }
  loadData(todosUrl: string) {
    this.http.get(todosUrl).map(res => res.json()).subscribe((data) => {
      this.allTodos = data;
      // this.getTodos(this.day);
    });
  }

  ngOnInit() {
    this.afa.authState.subscribe(res => {
      if (res.uid) {
        this.currentWeek = this.db.list(`/families/${res.uid}/currentWeek`, {preserveSnapshot: true});
        this.currentWeek.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
              this.weekData.push({key: snapshot.key, value: snapshot.val()})
          });
          console.log(this.weekData);
          this.days = this.weekData[0].value;
          console.log(this.days);
          this.currentDay = this.days[0];
        })
      }
    })
  }

  ngOnChanges() {

  }

  next() {
    this.currentDay = this.days[this.currentDayIndex++];
    if (this.currentDayIndex === 6) {
      this.currentDayIndex = 0;
    }
    // this.getTodos(this.day)
  }

  back() {
    this.day -= 1;
    console.log(this.day);

    if (this.day == -1)
      this.day = 6

    // this.getTodos(this.day)
  }

  getTodos(day) {
    var newArray = new Array;
    for (var i in this.allTodos) {
      if (this.allTodos[i].day == this.days[this.day].name)
        newArray.push(this.allTodos[i])
    }
    this.todos = newArray;

  }
  sendDate(actualDay) {

    if (this.days[this.day].name == "Lunes") {
      this.actualDay = "Lunes"
    } else if (this.days[this.day].name == "Martes") {
      this.actualDay = "Martes"
    } else if (this.days[this.day].name == "Miércoles") {
      this.actualDay = "Miércoles"
    } else if (this.days[this.day].name == "Jueves") {
      this.actualDay = "Jueves"
    } else if (this.days[this.day].name == "Viernes") {
      this.actualDay = "Viernes"
    } else if (this.days[this.day].name == "Sábado") {
      this.actualDay = "Sábado"
    } else if (this.days[this.day].name == "Domingo") {
      this.actualDay = "Domingo"
    } else {
      console.log("No soy un día! Forever Alone!");
    }
    window.location.replace("newTodo/"+this.actualDay);
    //return this.actualDay;
  }



}
