import { Component, ViewChild } from '@angular/core';
import {
  DialogConfig,
  DialogField,
  Dificultad,
  Ejercicio,
  FilterConfig,
} from '../../../models/interfaces';
import { EjercicioService } from '../../../services/ejercicios.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../components/generic-dialog/generic-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GenericFilterComponent } from '../../../components/generic-filter/generic-filter.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-ejercicios-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NavbarComponent,
    MatPaginatorModule,
    MatTableModule,
    GenericFilterComponent,
  ],
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
  dataSource = new MatTableDataSource<Ejercicio>([]);
  dialogFields!: DialogField[];
  filterConfig!: FilterConfig[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private ejercicioService: EjercicioService
  ) {
    this.initializeFilterConfig();
    this.initializeDialogFields();
    this.loadEjercicios();
    this.configureFilter();
  }

  private loadEjercicios(): void {
    this.dataSource.data = this.ejercicioService.getAll();
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

  private initializeFilterConfig(): void {
    this.filterConfig = [
      {
        key: 'nombre',
        label: 'Buscar por nombre',
        type: 'text',
      },
      {
        key: 'grupoMuscular',
        label: 'Grupo Muscular',
        type: 'select',
        options: this.ejercicioService.getGruposMusculares(), // Ahora sí disponible
      },
      {
        key: 'dificultad',
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
  onFilterChange(filters: any): void {
    // Aplicar los filtros a tu dataSource
    this.dataSource.filter = JSON.stringify(filters);
  }
  private configureFilter(): void {
    this.dataSource.filterPredicate = (data: Ejercicio, filter: string) => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every((key: string) => {
        const validKey = key as keyof Ejercicio;
        if (!(validKey in data)) return false;

        const filterValue = filters[validKey]?.toString().toLowerCase();
        if (!filterValue) return true;

        const dataValue = data[validKey]?.toString().toLowerCase();
        return dataValue?.includes(filterValue);
      });
    };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
