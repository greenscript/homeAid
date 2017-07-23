import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialogModule } from '@angular/material';
import { NewTodo } from '../../models/newTodo.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-createWeek-admin',
  templateUrl: './createWeek-admin.component.html',
  styleUrls: ['./createWeek-admin.component.scss'],
  providers: [DataService]
})
export class CreateWeekAdminComponent implements OnInit {
  allTodos = new Array;
  todos;
  day = 0;
  actualDay = "";
  days = [
    { "name": "Lunes" },
    { "name": "Martes" },
    { "name": "Miércoles" },
    { "name": "Jueves" },
    { "name": "Viernes" },
    { "name": "Sábado" },
    { "name": "Domingo" },
  ];
  constructor(private http: Http, private ds: DataService) {
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
    console.log(this.ds.currentUserId);
    this.ds.getCurrentWeek().subscribe((res) => {
      console.log(res)
    })
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
