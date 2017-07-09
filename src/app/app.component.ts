import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { NewTodo } from './models/newTodo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(private http: Http) {
    this.loadFromJson();
  }

  loadData(todosUrl: string) {
    this.http.get(todosUrl).map(res => res.json()).subscribe((data) => {

      for (var user of data) {
        let todos = new NewTodo(user.category, user.todo, user.state);
        // this.todos.push(todos);
      }

    });
  }


  loadFromJson() {
    this.loadData('../assets/data/todos.json');
  }

}

