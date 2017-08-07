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
  public navText: string = `Admin's Menu`;

  constructor(public as: AuthService, public router: Router, public ar: ActivatedRoute) {
    this.uid = ar.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    switch (this.router.url) {
      case `/menu/${this.uid}`:
        this.menu = true;
      break;
      case `/menu/${this.uid}/createWeek` :
      case `/menu/${this.uid}/newUser` :
        this.navText = 'Back to Menu';
        this.menu = true;
      break;
      case '/familyGoal':
        this.family = true;
      break;
      case `/user/${this.uid}`:
        this.profile = true;
      break;
    }
    this.admin();
  }

  admin() {
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
