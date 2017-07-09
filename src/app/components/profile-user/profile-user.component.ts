import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
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

  Data = [
    {"todo": "lunes tarea", "day" : 0, "cate" : 31 },
    {"todo": "martes tarea", "day" : 1, "cate" : 30 },
    {"todo": "miercoles tarea", "day" : 2, "cate" : 31 },
    {"todo": "jueves tarea", "day" : 3, "cate" : 29 },
    {"todo": "viernes tarea", "day" : 4, "cate" : 28 },
    {"todo": "sabado tarea", "day" : 5, "cate" : 27 },
    {"todo": "tarea test", "day" : 0, "cate" : 30 },
    {"todo": "Domingo test", "day" : 6, "cate" : 29 }
  ];
  
  constructor() { }

  ngOnInit() {
    this.getTodos(this.day)
  }
  
  next(){
   this.day += 1;
   if (this.day == 7)
   this.day = 0

   this.getTodos(this.day)
  }

  back(){
    this.day -= 1;
    if (this.day == -1)
    this.day = 6

    this.getTodos(this.day)
  }

  getTodos(day){
    var newArray = new Array;
    for (var i in this.Data){
      if(this.Data[i].day == day)
      newArray.push(this.Data[i])
    }
    this.todos = newArray;
    //console.log(this.todos);
  }

}
