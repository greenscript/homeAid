export class Day {
  private todos: Array<any>;
  private day: any;

  constructor(pDay) {
    this.setTodos();
    this.setDay(pDay);
  }

  getTodos() {
    return this.todos;
  }

  getDay() {
    return this.day;
  }

  setTodos() {
    this.todos = [];
  }

  setDay(pValue) {
    this.day = pValue;
  }
}
