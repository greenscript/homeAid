import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
