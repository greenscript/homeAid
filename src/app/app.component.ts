import { Component, OnInit } from '@angular/core';
import { NewTodo } from './models/newTodo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  allTodos = [];


  constructor() {

  }

  ngOnInit() {

  }

}
