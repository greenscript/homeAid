import { User } from './user.model';

export class NewTodo {
  //private user: User[] = [];
  private category: string;
  private todo: string;
  private status: boolean = false;
  // private day : number;
  //  private points: string;
  //todos temporal
  private todos: Array<any>;



  constructor(pCategory, pTodo, pStatus) {
    //  this.setUser(pUser);
    this.setCategory(pCategory);
    this.setTodo(pTodo);
    this.setStatus(pStatus);
    // this.setDay(pDay);
    //  this.setPoints(pPoints);
  }
  //  getUser() { return this.user; }
  getCategory() { return this.category; }
  getTodo() { return this.todo; }
  getStatus() { return this.status; }
  // getDay() {return this.day;}
  //  getPoints() { return this.points; }

  //  setUser(pValue) { this.user = pValue; }
  setCategory(pValue) { this.category = pValue; }
  setTodo(pValue) { this.todo = pValue; }
  setStatus(pValue) { this.status = pValue; }
  // setDay(pValue) { this.day = pValue;}
  //  setPoints(pValue) { this.points = pValue; }
  //  push para tareas?
  addTodoToTodos(Objtodo) { this.todos.push(Objtodo) }
}
