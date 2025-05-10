import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjerciciosListComponent } from './ejercicios-list.component';

describe('EjerciciosListComponent', () => {
  let component: EjerciciosListComponent;
  let fixture: ComponentFixture<EjerciciosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjerciciosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjerciciosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
