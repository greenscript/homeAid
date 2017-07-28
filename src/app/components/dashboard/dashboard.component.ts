import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public current: number;
  public max: number = 100;
  public uid: string;
  public currentWeek: FirebaseListObservable<any>;
  public weekData: Array<any> = [];
  public days: Array<any> = [];
  public daysWithTodos: Array<any> = [];
  public totalTodos: Array<any> = [];
  public undoneTodos: Array<any> = [];
  public percentage: string = '';

  constructor(
    public db: AngularFireDatabase,
    public afa: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afa.authState.subscribe(res => {
      if (res.uid) {
        this.uid = res.uid;
        this.currentWeek = this.db.list(`/families/${this.uid}/currentWeek`, {preserveSnapshot: true});
        this.currentWeek.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
              this.weekData.push({key: snapshot.key, value: snapshot.val()})
          });
          this.days = this.weekData[0].value;
          this.getDaysWithTodos();
          this.amountOfTodos();
          this.getWeekPercentage();
        })
      }
    })
  }

  getDaysWithTodos() {
    let daysWithTodos = this.days.filter(day =>  {
      if (!(day.todos === undefined)) {
        this.daysWithTodos.push(day)
      }
    });
  }

  amountOfTodos() {
    let totalTodos = this.daysWithTodos.filter(day => {
      for (let key in day.todos) {
        let values = day.todos[key];
        this.totalTodos.push(values)
      }
    })
    console.log(this.totalTodos);
  }

  getWeekPercentage() {
    let totalTodos = this.totalTodos.filter(todo => {
      if (todo.status === false) {
        this.undoneTodos.push(todo);
        console.log(this.undoneTodos)
      }
    })

    let todos = this.totalTodos.length - this.undoneTodos.length
    console.log(this.totalTodos.length, this.undoneTodos.length)
    console.log(todos)
    let percentage =  todos / this.totalTodos.length * this.max;
    console.log(percentage)
    this.current = percentage;
    this.percentage = `${percentage}%`
    console.log(this.percentage)
  }

}
