import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewTodo } from '../../models/newTodo.model';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {
  category: string;

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
    console.log("arreglo", this.todos[0]);

    for (var index = 0; index < this.todos.length; index++) {
      if (pvalue === this.todos[index]) {
        console.log("igual");

      } else {
        console.log("no es igual");

      }

    }
    // this.todos.push(new NewTodo(this.getUser(), this.getCategory(), this.getTodo(), this.getStatus(), this.getPoints());
    // console.log(this.todos);

    //console.log('test', this.todos);
  }
}
