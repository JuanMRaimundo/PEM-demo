import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionesListComponent } from './planificaciones-list.component';

describe('PlanificacionesListComponent', () => {
  let component: PlanificacionesListComponent;
  let fixture: ComponentFixture<PlanificacionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificacionesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
