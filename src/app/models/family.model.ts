import { User } from './user.model';
import { Week } from './week.model';

export class Family {
  private email: string;
  private name: string;
  private users: User[] = [];
  private weeks: Week[] = [];
  private currentWeek = new Week;

  constructor(
    pEmail:string,
    pName: string,
    pUsers: User[],
    pWeeks: Week[],
    pCurrentWeek: Week) {
      this.setEmail(pEmail);
      this.setName(pName);
      this.setUsers(pUsers);
      this.setWeeks(pWeeks);
      this.setCurrentWeek(pCurrentWeek);
    }

  getEmail() {
    return this.email;
  }

  getName() {
    return this.name;
  }

  getUsers() {
    return this.users;
  }

  getWeeks() {
    return this.weeks;
  }

  getCurrentWeek() {
    return this.currentWeek;
  }

  setEmail(pValue) {
    this.email = pValue;
  }

  setName(pValue) {
    this.name = pValue;
  }

  setUsers(pValue) {
    this.users = pValue;
  }

  setWeeks(pValue) {
    this.weeks = pValue;
  }

  setCurrentWeek(pValue) {
    this.currentWeek = pValue;
  }

  public addUser(pUser: User) {
    this.users.push(pUser);
  }

  public addWeek(pWeek: Week) {
    this.weeks.push(pWeek);
  }
}
