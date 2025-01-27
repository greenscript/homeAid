import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBarComponent } from './mobile-bar.component';

describe('MobileBarComponent', () => {
  let component: MobileBarComponent;
  let fixture: ComponentFixture<MobileBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
