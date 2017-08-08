import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-family-goal',
  templateUrl: './family-goal.component.html',
  styleUrls: ['./family-goal.component.scss']
})
export class FamilyGoalComponent implements OnInit {
  public uid: string;
  constructor(public ar: ActivatedRoute) {
    this.uid = ar.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
