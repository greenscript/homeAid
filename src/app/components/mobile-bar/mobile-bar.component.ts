import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-mobile-bar',
  templateUrl: './mobile-bar.component.html',
  styleUrls: ['./mobile-bar.component.scss']
})
export class MobileBarComponent implements OnInit {
  public dashboard: boolean;
  public users: boolean;
  public menu: boolean;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    switch (this.router.url) {
      case '/dashboard':
        this.dashboard = true;
      break;
      case '/users':
        this.users = true;
      break;
      case '/menu':
        this.menu = true;
      break;
    }
  }

}
