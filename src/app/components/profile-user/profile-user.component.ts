import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  day = 0;
  days = [
    {"name": "Lunes"},
    {"name": "Martes"},
    {"name": "Miércoles"},
    {"name": "Jueves"},
    {"name": "Viernes"},
    {"name": "Sábado"},
    {"name": "Domingo"},
  ];
  
  constructor() { }

  ngOnInit() {
  }

  next(){
   this.day += 1;
   if (this.day == 7)
   this.day = 0
  }
  

  back(){
    this.day -= 1;
    if (this.day == -1)
    this.day = 6
 }

}
