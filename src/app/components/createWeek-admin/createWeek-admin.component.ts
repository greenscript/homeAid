import { Component, OnInit } from '@angular/core';
import { MdDialogModule } from '@angular/material';
import { NewTodo } from '../../models/newTodo.model';

@Component({
  selector: 'app-createWeek-admin',
  templateUrl: './createWeek-admin.component.html',
  styleUrls: ['./createWeek-admin.component.scss']
})
export class CreateWeekAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
