import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingDashboardComponent } from './adding-dashboard.component';

describe('AddingDashboardComponent', () => {
  let component: AddingDashboardComponent;
  let fixture: ComponentFixture<AddingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
