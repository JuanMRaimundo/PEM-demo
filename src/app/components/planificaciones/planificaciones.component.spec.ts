import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionesComponent } from './planificaciones.component';

describe('PlanificacionesComponent', () => {
  let component: PlanificacionesComponent;
  let fixture: ComponentFixture<PlanificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
