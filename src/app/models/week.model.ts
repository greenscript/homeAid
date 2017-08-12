export class Week {
  private todos: Array<any>;
  private firstDay: any;
  private lastDay: any;
  private days: Array<any> = [];
  private goal: Array<any> = [];


  constructor(pTodos, pFirstDay, pLastDay, pDays,pGoal) {
    this.setTodos(pTodos);
    this.setFirstDay(pFirstDay);
    this.setLastDay(pLastDay);
    this.setDays(pDays);
    this.setGoal(pGoal);

  }

  getTodos() { return this.todos; }
  getFirstDay() { return this.firstDay; }
  getLastDay() { return this.lastDay; }
  getDays() { return this.days; }
  getGoal() { return this.goal; }

  setTodos(pValue) { this.todos = pValue; }
  setFirstDay(pValue) { this.firstDay = pValue; }
  setLastDay(pValue) { this.lastDay = pValue; }
  setGoal(pValue) { this.goal = pValue; }

  setDays(pValue) {
    this.days = pValue;
  }

  public getTotalTodos() {
    return this.todos.length;
  };



}
