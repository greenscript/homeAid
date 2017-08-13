import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRewardComponent } from './family-reward.component';

describe('FamilyRewardComponent', () => {
  let component: FamilyRewardComponent;
  let fixture: ComponentFixture<FamilyRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
