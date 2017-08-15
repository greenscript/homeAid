import { User } from './user.model';

export class NewTodo {
  //private user: User[] = [];
  private category: string;
  private todo: string;
  private status: boolean = false;
  private day: number;
  private points: string;
  //todos temporal
  private todos: Array<any>;
  private revelanceBy: string;
  private nameOfNewUser: string;
  private priority: string;
  private categoryImg: string;



  constructor(pCategory, pTodo, pStatus, pDay, pPoints,pRelevanceBy,pnameOfNewUser,pPriority,pCategoryImg) {
    //  this.setUser(pUser);
    this.setCategory(pCategory);
    this.setTodo(pTodo);
    this.setStatus(pStatus);
    this.setDay(pDay);
    this.setPoints(pPoints);
    this.setRelevanceBy(pRelevanceBy);
    this.setNameOfNewUser(pnameOfNewUser);
    this.setPriority(pPriority);
    this.setCategoryImg(pCategoryImg);
  }
  //  getUser() { return this.user; }
  getCategory() { return this.category; }
  getTodo() { return this.todo; }
  getStatus() { return this.status; }
  getDay() { return this.day; }
  getPoints() { return this.points; }
  getRevelanceBy() { return this.revelanceBy; }
  getNameOfNewUser() { return this.nameOfNewUser; }
  getPriority() { return this.priority; }
  getCategoryImg() { return this.categoryImg; }



  //  setUser(pValue) { this.user = pValue; }
  setCategory(pValue) { this.category = pValue; }
  setTodo(pValue) { this.todo = pValue; }
  setStatus(pValue) { this.status = pValue; }
  setDay(pValue) { this.day = pValue; }
  setPoints(pValue) { this.points = pValue; }
  setRelevanceBy(pValue) { this.points = pValue; }
  setNameOfNewUser(pValue) { this.points = pValue; }
  setPriority(pValue) { this.points = pValue; }
  setCategoryImg(pValue) { this.categoryImg = pValue; }


  //  push para tareas?
  addTodoToTodos(Objtodo) { this.todos.push(Objtodo) }
}
