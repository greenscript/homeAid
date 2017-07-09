import { User } from './user.model';

export class NewTodo {
  //private user: User[] = [];
  private category: string;
  private todo: string;
  private status: boolean = false;
//  private points: string;
//todos temporal
private todos: Array<any>;



    constructor(pCategory,pTodo,pStatus) {
    //  this.setUser(pUser);
      this.setCategory(pCategory);
      this.setTodo(pTodo);
      this.setStatus(pStatus);
    //  this.setPoints(pPoints);
    }
  //  getUser() { return this.user; }
    getCategory() { return this.category; }
    getTodo() { return this.todo; }
    getStatus() { return this.status; }
  //  getPoints() { return this.points; }

  //  setUser(pValue) { this.user = pValue; }
    setCategory(pValue) { this.category = pValue; }
    setTodo(pValue) { this.todo = pValue; }
    setStatus(pValue) { this.status = pValue; }
  //  setPoints(pValue) { this.points = pValue; }
  //  push para tareas?
   addTodoToTodos(Objtodo){ this.todos.push(Objtodo) }
}
