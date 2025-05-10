import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { Atleta, DialogConfig } from '../../../models/interfaces';
import {
  DialogField,
  GenericDialogComponent,
} from '../../../components/generic-dialog/generic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AtletaService } from '../../../services/atletas.service';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-atletas-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, NavbarComponent],
  templateUrl: './atletas-list.component.html',
  styleUrl: './atletas-list.component.css',
})
export class AtletasListComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'acciones'];
  dataSource: Atleta[] = [];

  dialogFields: DialogField[] = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'apellido', label: 'Apellido', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'text', required: true },
  ];

  constructor(public dialog: MatDialog, private atletaService: AtletaService) {
    this.loadAtletas();
  }

  private loadAtletas(): void {
    this.dataSource = this.atletaService.getAtletas();
  }

  openDialog(atleta?: Atleta): void {
    const dialogConfig: DialogConfig = {
      title: atleta ? 'Editar Atleta' : 'Nuevo Atleta',
      fields: this.dialogFields,
      model: atleta || {},
    };

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: dialogConfig,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.atletaService.saveAtleta({ ...result, id: atleta?.id });
        this.loadAtletas();
      }
    });
  }

  onDelete(id: number): void {
    this.atletaService.deleteAtleta(id);
    this.loadAtletas();
  }
}
