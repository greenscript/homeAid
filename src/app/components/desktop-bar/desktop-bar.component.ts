import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-bar',
  templateUrl: './desktop-bar.component.html',
  styleUrls: ['./desktop-bar.component.scss'],
  providers: [AuthService]
})
export class DesktopBarComponent implements OnInit {
  public init: boolean;
  public profile: boolean;
  public family: boolean;
  public alarms: boolean;

  constructor(public as: AuthService, public router: Router) { }

  ngOnInit() {
    switch (this.router.url) {
      case '/familyTodos':
        this.family = true;
      break;
      case '/user':
        this.profile = true;
        console.log(this.profile);
      break;
      case '':

      break;
    }
  }

  logout() {
    this.as.logout();
  }

}
