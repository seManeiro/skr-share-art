import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteViewComponent } from './complete-view.component';

describe('CompleteViewComponent', () => {
  let component: CompleteViewComponent;
  let fixture: ComponentFixture<CompleteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
