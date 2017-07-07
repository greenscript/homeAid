export class NewTodo {
  private user: object;
  private category: string;
  private todo: string;
  private status: boolean = false;
  private points: string;


    constructor(pUser,pCategory,pTodo,pStatus,pPoints) {
      this.setUser(pUser);
      this.setCategory(pCategory);
      this.setTodo(pTodo);
      this.setStatus(pStatus);
      this.setPoints(pPoints);
    }
    getUser() { return this.user; }
    getCategory() { return this.category; }
    getTodo() { return this.todo; }
    getStatus() { return this.status; }
    getPoints() { return this.points; }

    setUser(pValue) { this.user = pValue; }
    setCategory(pValue) { this.category = pValue; }
    setTodo(pValue) { this.todo = pValue; }
    setStatus(pValue) { this.status = pValue; }
    setPoints(pValue) { this.points = pValue; }
}
