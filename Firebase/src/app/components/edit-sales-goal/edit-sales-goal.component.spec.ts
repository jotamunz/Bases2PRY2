import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesGoalComponent } from './edit-sales-goal.component';

describe('EditSalesGoalComponent', () => {
  let component: EditSalesGoalComponent;
  let fixture: ComponentFixture<EditSalesGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSalesGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalesGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
