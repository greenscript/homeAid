import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
  providers: [AuthService]
})
export class MenuAdminComponent implements OnInit {

  constructor(private as: AuthService) { }

  ngOnInit() {
    console.log(this.as.currentUserId);
  }

}
