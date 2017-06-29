import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() name: string;
  @Input() email: string;
  @Input() password: string;
  @Input() members: number;

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log('let us in');
  }
}
