import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyGoalComponent } from './family-goal.component';

describe('FamilyGoalComponent', () => {
  let component: FamilyGoalComponent;
  let fixture: ComponentFixture<FamilyGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
