import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-family-goal',
  templateUrl: './family-goal.component.html',
  styleUrls: ['./family-goal.component.scss']
})
export class FamilyGoalComponent implements OnInit {
  @Input() titleGoal;
  @Input() descriptionGoal;
  public uid: string;

  constructor(public ar: ActivatedRoute) {
    this.uid = ar.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
  sendFamGoal(titleGoal,descriptionGoal){
    console.log('!!!!',titleGoal, ' - ', descriptionGoal);
    if(titleGoal == null || descriptionGoal == null){
      console.log('empty fields');
    }else{
      console.log('!!!!',titleGoal, ' - ', descriptionGoal);

    }
  }

}
