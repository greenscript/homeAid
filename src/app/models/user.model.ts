export class User {
  private name: string;
  private avatar: string;
  private todos: Array<any>;
  private alerts: Array<any>;
  private birthdate: string;
  private styles: string;

  constructor(pName, pAvatar, pTodos, pAlerts, pBirthdate, pStyles) {
    this.setName(pName);
    this.setAvatar(pAvatar);
    this.setTodos(pTodos);
    this.setAlerts(pAlerts );
    this.setBirthdate(pBirthdate);
    this.setStyles(pStyles);
  }

  getName() { return this.name; }
  getTodos() { return this.todos; }
  getAlerts() { return this.alerts; }
  getBirthdate() { return this.birthdate; }
  getStyles() { return this.styles; }

  setName(pValue) { this.name = pValue; }
  setAvatar(pValue) { this.avatar = pValue; }
  setTodos(pValue) { this.todos = pValue; }
  setAlerts(pValue) { this.alerts = pValue; }
  setBirthdate(pValue) { this.birthdate = pValue; }
  setStyles(pValue) { this.styles = pValue; }

  public addTodos(todo: any) { this.todos.push(todo); }
}
