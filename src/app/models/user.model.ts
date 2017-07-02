export class User {
  private name: string;
  private avatar: string;
  private points: number;
  private todos: Array<any>;
  private alerts: Array<any>;
  private birthdate: string;

  constructor (pName, pAvatar, pPoints, pTodos, pAlerts, pBirthdate) {
    this.setName(pName);
    this.setAvatar(pAvatar);
    this.setPoints(pPoints);
    this.setTodos(pTodos);
    this.setAlerts(pAlerts);
    this.setBirthdate(pBirthdate);
  }

  getName() { return this.name; }
  getPoints() { return this.points; }
  getTodos() { return this.todos; }
  getAlerts() { return this.alerts; }
  getBirthdate() { return this.birthdate; }

  setName(pValue) { this.name = pValue; }
  setAvatar(pValue) { this.avatar = pValue; }
  setPoints(pValue) { this.points = pValue; }
  setTodos(pValue) { this.todos = pValue; }
  setAlerts(pValue) { this.alerts = pValue; }
  setBirthdate(pValue) { this.birthdate = pValue; }

  public addTodos(todo: any) { this.todos.push(todo); }
}
