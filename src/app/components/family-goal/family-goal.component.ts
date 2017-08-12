import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-family-goal',
  templateUrl: './family-goal.component.html',
  styleUrls: ['./family-goal.component.scss']
})
export class FamilyGoalComponent implements OnInit {
  @Input() gTitle;
  @Input() gdescriptionGoal;
  public uid: string;

  constructor(public ar: ActivatedRoute) {
    this.uid = ar.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  sendFamGoal(gTitle,gdescriptionGoal){
    if(gTitle == null && gdescriptionGoal == null){
      console.log('empty fields');
    }else{
      console.log('!!!!',gTitle, ' - ', gdescriptionGoal);

    }
  }

}
