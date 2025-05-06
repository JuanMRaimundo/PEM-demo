import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';

export interface DialogConfig {
  title: string;
  fields: DialogField[];
  model?: any; // Modelo existente (para edición)
}

export interface DialogField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'date';
  required?: boolean;
  options?: any[]; // Para select/multiselect
  optionLabel?: string; // Clave del objeto para mostrar en opciones
}

@Component({
  selector: 'app-generic-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './generic-dialog.component.html',
  styleUrl: './generic-dialog.component.css',
})
export class GenericDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfig
  ) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    const group: any = {};
    this.data.fields.forEach((field) => {
      const value = this.data.model ? this.data.model[field.name] : '';
      group[field.name] = [value, field.required ? Validators.required : null];
    });
    return this.fb.group(group);
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
