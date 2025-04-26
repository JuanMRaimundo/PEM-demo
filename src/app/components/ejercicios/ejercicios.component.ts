import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';
import { Ejercicio } from '../../models/ejercicio';

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css',
})
export class EjerciciosComponent {
  // Datos de ejemplo (mock)
  ejercicios: Ejercicio[] = [
    {
      id: 1,
      nombre: 'Sentadillas',
      descripcion: 'Ejercicio para piernas',
      grupoMuscular: 'Piernas',
      dificultad: 'Media',
    },
    {
      id: 2,
      nombre: 'Press Banca',
      descripcion: 'Ejercicio para pecho',
      grupoMuscular: 'Pecho',
      dificultad: 'Alta',
    },
  ];

  // Configuración de la tabla
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'grupoMuscular',
    'dificultad',
    'acciones',
  ];
}
