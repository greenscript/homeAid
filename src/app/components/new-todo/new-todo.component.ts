import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewTodo } from '../../models/newTodo.model';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {

  todos = [
    { category: "Pets", description: "Hacerle carinitos a Chanchillo." },
    { category: "Pets", description: "Dar de comer a pecas" },
    { category: "Acomodar", description: "Barrer popo de perritos" },
  ]




  constructor() { }

  ngOnInit() {
  }

  // addTodo(value, event) {
  //   console.log('hg', value, event);
  //   // console.log(document.getElementsByTagName('input').getAttribute('data-category'));

  addTodo(pcategory) {
    console.log('category', pcategory);


    //console.log('test', this.todos);
  }
}
