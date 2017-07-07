import { Component, OnInit } from '@angular/core';
import { NewTodo } from '../../models/newTodo.model';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
