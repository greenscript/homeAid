import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.scss']
})
export class DetailTodoComponent implements OnInit {
  public userId: string;
  constructor(private route: ActivatedRoute, ) {
    this.userId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
