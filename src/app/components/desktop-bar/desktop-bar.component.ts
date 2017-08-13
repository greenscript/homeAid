import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desktop-bar',
  templateUrl: './desktop-bar.component.html',
  styleUrls: ['./desktop-bar.component.scss'],
  providers: [AuthService]
})
export class DesktopBarComponent implements OnInit {
  @Input() adminId: string;
  public menu: boolean;
  public init: boolean;
  public profile: boolean;
  public family: boolean;
  public alarms: boolean;
  public isAdmin: boolean;
  public uid: string;
  public day: string;
  public dayI: string;
  public navText: string = `Menu Admin`;

  constructor(public as: AuthService, public router: Router, public ar: ActivatedRoute) {
    this.uid = ar.snapshot.paramMap.get('id');
    this.day = ar.snapshot.paramMap.get('day');
    this.dayI = ar.snapshot.paramMap.get('index');
  }

  ngOnInit() {
    console.log(this.router.url)
    switch (this.router.url) {
      case `/menu/${this.uid}`:
        this.menu = true;
        break;
      case `/menu/${this.uid}/createWeek`:
      case `/menu/${this.uid}/newUser`:
      case `/newTodo/${this.uid}/${this.day}/${this.dayI}`:
        this.navText = 'Regresar al Menu';
        this.menu = true;
        break;

      case `/familyTodos/${this.uid}`:
        this.family = true;
        break;
      case `/user/${this.uid}`:
        this.profile = true;
        break;
    }
    this.admin();
  }

  admin() {
    console.log(this.adminId)
    switch (this.adminId) {

      case '0':
        this.isAdmin = true;
        break;
      default:
        this.isAdmin = false;
        break;
    }
  }

  logout() {
    this.as.logout();
  }

}
