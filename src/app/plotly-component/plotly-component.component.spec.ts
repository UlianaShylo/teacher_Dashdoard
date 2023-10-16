import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyComponent } from './plotly-component.component';

describe('PlotlyComponentComponent', () => {
  let component: PlotlyComponent;
  let fixture: ComponentFixture<PlotlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlotlyComponent]
    });
    fixture = TestBed.createComponent(PlotlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
