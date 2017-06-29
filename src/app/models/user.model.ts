export class User {
  private name: string;
  private email: string;
  private password: string;
  private avatar: string;
  private points: number;
  private todos: Array<any>;
  private alerts: Array<any>;
  private birthdate: string;
  private type: string;

  constructor (pName, pPassword, pAvatar, pEmail, pPoints, pTodos, pAlerts, pBirthdate, pType) {
    this.setName(pName);
    this.setEmail(pEmail);
    this.setPassword(pPassword);
    this.setAvatar(pAvatar);
    this.setPoints(pPoints);
    this.setTodos(pTodos);
    this.setAlerts(pAlerts);
    this.setBirthdate(pBirthdate);
    this.setType(pType);
  }

  getName() { return this.name; }
  getEmail() { return this.email; }
  getPassword() { return this.password; }
  getAvatar() { return this.avatar; }
  getPoints() { return this.points; }
  getTodos() { return this.todos; }
  getAlerts() { return this.alerts; }
  getBirthdate() { return this.birthdate; }
  getType() { return this.type; }

  setName(pValue) { this.name = pValue; }
  setEmail(pValue) { this.email = pValue; }
  setPassword(pValue) { this.password = pValue; }
  setAvatar(pValue) { this.avatar = pValue; }
  setPoints(pValue) { this.points = pValue; }
  setTodos(pValue) { this.todos = pValue; }
  setAlerts(pValue) { this.alerts = pValue; }
  setBirthdate(pValue) { this.birthdate = pValue; }
  setType(pValue) { this.type = pValue; }

  public addTodos(todo: any) { this.todos.push(todo); }
}
