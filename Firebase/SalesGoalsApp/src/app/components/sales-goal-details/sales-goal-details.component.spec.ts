import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGoalDetailsComponent } from './sales-goal-details.component';

describe('SalesGoalDetailsComponent', () => {
  let component: SalesGoalDetailsComponent;
  let fixture: ComponentFixture<SalesGoalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesGoalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesGoalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
