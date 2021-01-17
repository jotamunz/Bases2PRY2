import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesGoalComponent } from './add-sales-goal.component';

describe('AddSalesGoalComponent', () => {
  let component: AddSalesGoalComponent;
  let fixture: ComponentFixture<AddSalesGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
