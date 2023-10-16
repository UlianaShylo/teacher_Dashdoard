import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxListComponent } from './app-checkbox-list.component';

describe('AppCheckboxListComponent', () => {
  let component: CheckboxListComponent;
  let fixture: ComponentFixture<CheckboxListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxListComponent]
    });
    fixture = TestBed.createComponent(CheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
