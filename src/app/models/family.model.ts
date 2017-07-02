import { User } from './user.model';
import { Week } from './week.model';

export class Family {
  private email: string;
  private password: string;
  private users: User[] = [];
  private securityQuestion: string;
  private weeks: Week[] = [];
  private currentWeek = new Week;

  constructor(
    pEmail:string,
    pPassword: string,
    pUsers: User[],
    pSecurytyQuestion: string,
    pWeeks: Week[],
    pCurrentWeek: Week) {
      this.setEmail(pEmail);
      this.setPassword(pPassword);
      this.setUsers(pUsers);
      this.setSecurityQuestion(pSecurytyQuestion);
      this.setWeeks(pWeeks);
      this.setCurrentWeek(pCurrentWeek);
    }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getUsers() {
    return this.users;
  }

  getSecurityQuestion() {
    return this.securityQuestion;
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

  setPassword(pValue) {
    this.password = pValue;
  }

  setUsers(pValue) {
    this.users = pValue || [];
  }

  setSecurityQuestion(pValue) {
    this.securityQuestion = pValue;
  }

  setWeeks(pValue) {
    this.weeks = pValue || [];
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
