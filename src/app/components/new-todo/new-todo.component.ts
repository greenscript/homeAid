import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewTodo } from '../../models/newTodo.model';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {
  buttons = document.getElementsByTagName("input");
  buttonsCount = this.buttons.length;
  constructor() { }

  ngOnInit() {
  }

  addTodo(value, event) {
    console.log('hg', value, event);
    console.log(event.getAttribute());// console.log(document.getElementsByTagName('input').getAttribute('data-category'));

    // this.bee.posts.push(new Post(this.newIdPost, this.bee.getId(), this.titlePost, this.bodyPost));
    // console.log(this.bee.getPosts());
  }
}
