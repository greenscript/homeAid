export class Week {
  private todos: Array<any>;
  private firstDay: any;
  private lastDay: any;
  private days: Array<any> = [];

  constructor(pTodos, pFirstDay, pLastDay, pDays) {
    this.setTodos(pTodos);
    this.setFirstDay(pFirstDay);
    this.setLastDay(pLastDay);
    this.setDays(pDays);
  }

  getTodos() { return this.todos; }
  getFirstDay() { return this.firstDay; }
  getLastDay() { return this.lastDay; }
  getDays() { return this.days; }

  setTodos(pValue) { this.todos = pValue; }
  setFirstDay(pValue) { this.firstDay = pValue; }
  setLastDay(pValue) { this.lastDay = pValue; }
  setDays(pValue) {
    this.days = pValue;
  }

  public getTotalTodos() {
    return this.todos.length;
  };



}
