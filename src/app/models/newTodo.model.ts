export class NewTodo {
  private user: string;
  private category: string;
  private todo: string;
  private status: string;

    constructor(pUser,pCategory,pTodo,pStatus) {
      this.setUser(pUser);
      this.setStatus(pStatus);
    }
    getUser() { return this.user; }
    getCategory() { return this.category; }
    getTodo() { return this.todo; }
    getStatus() { return this.status; }


    setUser(pValue) { this.user = pValue; }
    setStatus(pValue) { this.status = pValue; }
}
