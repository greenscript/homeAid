import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialogModule } from '@angular/material';
import { NewTodo } from '../../models/newTodo.model';

@Component({
  selector: 'app-createWeek-admin',
  templateUrl: './createWeek-admin.component.html',
  styleUrls: ['./createWeek-admin.component.scss']
})
export class CreateWeekAdminComponent implements OnInit {
  allTodos = new Array;
  todos;
  day = 0;
  acualDay = "";
  days = [
    { "name": "Lunes" },
    { "name": "Martes" },
    { "name": "Miércoles" },
    { "name": "Jueves" },
    { "name": "Viernes" },
    { "name": "Sábado" },
    { "name": "Domingo" },
  ];
  constructor(private http: Http) {
    this.loadData('../assets/data/todos.json');
  }
  loadData(todosUrl: string) {
    this.http.get(todosUrl).map(res => res.json()).subscribe((data) => {
      this.allTodos = data;
      this.getTodos(this.day);
    });
  }
  ngOnInit() {
  }

  next() {
    this.day += 1;
    if (this.day == 7)
      this.day = 0

    this.getTodos(this.day)
  }

  back() {
    this.day -= 1;
    console.log(this.day);

    if (this.day == -1)
      this.day = 6

    this.getTodos(this.day)
  }

  getTodos(day) {
    var newArray = new Array;
    for (var i in this.allTodos) {
      if (this.allTodos[i].day == this.days[this.day].name)
        newArray.push(this.allTodos[i])
    }
    this.todos = newArray;

  }
  sendDate(acualDay) {

    if (this.days[this.day].name == "Lunes") {
      this.acualDay = "Lunes"
    } else if (this.days[this.day].name == "Martes") {
      this.acualDay = "Martes"
    } else if (this.days[this.day].name == "Miércoles") {
      this.acualDay = "Miércoles"
    } else if (this.days[this.day].name == "Jueves") {
      this.acualDay = "Jueves"
    } else if (this.days[this.day].name == "Viernes") {
      this.acualDay = "Viernes"
    } else if (this.days[this.day].name == "Sábado") {
      this.acualDay = "Sábado"
    } else if (this.days[this.day].name == "Domingo") {
      this.acualDay = "Domingo"
    } else {
      console.log("No soy un día! Forever Alone!");
    }
  }
}
