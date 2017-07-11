import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../models/user.model';
import { NewTodo } from '../../models/newTodo.model';


@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  allTodos = new Array;
  todos;
  day = 0;
  days = [
    {"name": "Lunes"},
    {"name": "Martes"},
    {"name": "Miércoles"},
    {"name": "Jueves"},
    {"name": "Viernes"},
    {"name": "Sábado"},
    {"name": "Domingo"},
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
  
  next(){
   this.day += 1;
   if (this.day == 7)
   this.day = 0

   this.getTodos(this.day)
  }

  back(){
    this.day -= 1;
    console.log(this.day);
    
    if (this.day == -1)
    this.day = 6

    this.getTodos(this.day)
  }

  getTodos(day){
    var newArray = new Array;
    for (var i in this.allTodos){
      if(this.allTodos[i].day == this.days[this.day].name)
      newArray.push(this.allTodos[i])
    }
    this.todos = newArray;
    
  }

}
