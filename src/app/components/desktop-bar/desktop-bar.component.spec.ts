import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopBarComponent } from './desktop-bar.component';

describe('DesktopBarComponent', () => {
  let component: DesktopBarComponent;
  let fixture: ComponentFixture<DesktopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
