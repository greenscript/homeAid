import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewTodo } from '../../models/newTodo.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {
  categoryForModel;
  newTodoObj;
  //todosArray : NewTodo [];

  todos = [
    { category: "Pets", description: "Hacerle carinitos a Chanchillo." },
    { category: "Pets", description: "Dar de comer a pecas" },
    { category: "Acomodar", description: "Barrer popo de perritos" },
    { category: "Acomodar", description: "Ordenar sala" }
  ]

  constructor() { }

  ngOnInit() {
  }

  addTodo(pvalue) {
    console.log('category', pvalue);
    console.log("arreglo", this.todos[0].description);

    for (var index = 0; index < this.todos.length; index++) {
      if (pvalue == this.todos[index].description) {
        this.categoryForModel = this.todos[index].category;
        console.log('holi soy igual ', pvalue, ' y ', this.todos[index].description, 'y mi category es:', this.categoryForModel);

        this.newTodoObj = new NewTodo(this.categoryForModel, pvalue, false);

        this.todos.push(this.newTodoObj);

        console.log(this.todos);

      } else {
        // xD
        console.log('apesto a pedo');
      }
    }
  }
}
