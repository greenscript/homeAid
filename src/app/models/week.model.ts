export class Week {
  private todos: Array<any>;
  private firstDay: any;
  private lastDay: any;

  constructor(pTodos, pFirstDay, pLastDay) {
    this.setTodos(pTodos);
    this.setFirstDay(pFirstDay);
    this.setLastDay(pLastDay);
  }

  getTodos() { return this.todos; }
  getFirstDay() { return this.firstDay; }
  getLastDay() { return this.lastDay; }

  setTodos(pValue) { this.todos = pValue; }
  setFirstDay(pValue) { this.firstDay = pValue; }
  setLastDay(pValue) { this.lastDay = pValue; }

  public getTotalTodos() {
    return this.todos.length;
  };

}
