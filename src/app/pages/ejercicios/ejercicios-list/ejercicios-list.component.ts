import { Component } from '@angular/core';
import {
  DialogConfig,
  DialogField,
  Dificultad,
  Ejercicio,
} from '../../../models/interfaces';
import { EjercicioService } from '../../../services/ejercicios.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../components/generic-dialog/generic-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-ejercicios-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, NavbarComponent],
  templateUrl: './ejercicios-list.component.html',
  styleUrl: './ejercicios-list.component.css',
})
export class EjerciciosListComponent {
  displayedColumns: string[] = [
    'nombre',
    'grupoMuscular',
    'dificultad',
    'acciones',
  ];
  dataSource: Ejercicio[] = [];
  dialogFields!: DialogField[];
  constructor(
    public dialog: MatDialog,
    private ejercicioService: EjercicioService
  ) {
    this.initializeDialogFields();
    this.loadEjercicios();
  }

  private loadEjercicios(): void {
    this.dataSource = this.ejercicioService.getAll();
  }

  private initializeDialogFields(): void {
    this.dialogFields = [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      { name: 'descripcion', label: 'Descripción', type: 'text' },
      {
        name: 'grupoMuscular',
        label: 'Grupo Muscular',
        type: 'select',
        required: true,
        options: this.ejercicioService.getGruposMusculares(),
      },
      {
        name: 'dificultad',
        label: 'Dificultad',
        type: 'select',
        options: ['Principiante', 'Intermedio', 'Avanzado'],
      },
    ];
  }

  openDialog(ejercicio?: Ejercicio): void {
    const dialogConfig: DialogConfig = {
      title: ejercicio ? 'Editar Ejercicio' : 'Nuevo Ejercicio',
      fields: this.dialogFields,
      model: ejercicio || {},
    };

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: dialogConfig,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        ejercicio
          ? this.ejercicioService.update(ejercicio.id, result)
          : this.ejercicioService.create(result);
        this.loadEjercicios();
      }
    });
  }

  onDelete(id: number): void {
    this.ejercicioService.delete(id);
    this.loadEjercicios();
  }
  getDificultadColor(dificultad?: Dificultad): string {
    switch (dificultad) {
      case 'Principiante':
        return 'primary';
      case 'Intermedio':
        return 'accent';
      case 'Avanzado':
        return 'warn';
      default:
        return '';
    }
  }
}
