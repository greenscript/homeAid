import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { NewTodo } from './models/newTodo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  allTodos = [];
  constructor(private http: Http) {

  }

  ngOnInit() {
    // es mejor llamarlo desde el init
    this.loadFromJson();
  }

  loadData(todosUrl: string) {
    this.http.get(todosUrl).map(res => res.json()).subscribe((data) => {

      for (var todo of data) {
        let todos = new NewTodo(todo.category, todo.todo, todo.status);
        this.allTodos.push(todos);
        //  console.log('SDKAHSBDHA',this.allTodos);
      }

    });
  }

  loadFromJson() {
    this.loadData('../assets/data/todos.json');
  }

}
