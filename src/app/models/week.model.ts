export class Week {
  private todos: Array<any>;
  private firstDay: any;
  private lastDay: any;
  private days: Array<any> = [];
  private goals: any;


  constructor(pTodos, pFirstDay, pLastDay, pDays, pGoals) {
    this.setTodos(pTodos);
    this.setFirstDay(pFirstDay);
    this.setLastDay(pLastDay);
    this.setDays(pDays);
    this.setGoals(pGoals);

  }

  getTodos() { return this.todos; }
  getFirstDay() { return this.firstDay; }
  getLastDay() { return this.lastDay; }
  getDays() { return this.days; }
  getGoals() { return this.goals; }

  setTodos(pValue) { this.todos = pValue; }
  setFirstDay(pValue) { this.firstDay = pValue; }
  setLastDay(pValue) { this.lastDay = pValue; }
  setGoals(pValue) { this.goals = pValue; }

  setDays(pValue) {
    this.days = pValue;
  }

  public getTotalTodos() {
    return this.todos.length;
  };



}
