import { User } from './user.model';

export class NewTodo {
  userId: string;
  description: string;
  category: string;
  status:  boolean = false;
  relevance:  boolean = false;
  day: number;
  points: number;
  relevanceBy: string;
  priority:  boolean = false;
  nameUser: string;
  private todos: Array<any>;


  constructor(pUserId,pCategory, pDescription,pStatus,pRelevance,pDay,pPoints,pRelevanceBy,pPriority,pNameUser) {
    this.setUserId(pUserId);
    this.setDescription(pDescription);
    this.setCategory(pCategory);
    this.setStatus(pStatus);
    this.setRelevance(pRelevance);
    this.setDay(pDay);
    this.setPoints(pPoints);
    this.setRelevanceBy(pRelevanceBy);
    this.setPriority(pPriority);
    this.setNameUser(pNameUser);
  }

  setUserId(pValue){this.userId = pValue }
  setDescription(pValue){this.description = pValue }
  setCategory(pValue){this.category = pValue }
  setStatus(pValue){this.status = pValue }
  setRelevance(pValue){this.relevance = pValue }
  setDay(pValue){this.day = pValue }
  setPoints(pValue){this.points = pValue }
  setRelevanceBy(pValue){this.relevanceBy = pValue }
  setPriority(pValue){this.priority = pValue }
  setNameUser(pValue){this.nameUser = pValue }


  /*setCategory(pValue) { this.category = pValue; }
  setTodo(pValue) { this.todo = pValue; }
  setStatus(pValue) { this.status = pValue; }
  setDay(pValue) { this.day = pValue; }
  setPoints(pValue) { this.points = pValue; }
  setRelevanceBy(pValue) { this.points = pValue; }
  setNameOfNewUser(pValue) { this.points = pValue; }
  setPriority(pValue) { this.points = pValue; }
  setCategoryImg(pValue) { this.categoryImg = pValue; }

*/
  //  push para tareas?
  addTodoToTodos(Objtodo) { this.todos.push(Objtodo) }
}
