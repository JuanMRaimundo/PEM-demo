import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterConfig } from '../../models/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'app-generic-filter',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './generic-filter.component.html',
  styleUrl: './generic-filter.component.css',
})
export class GenericFilterComponent {
  @Input() filterConfig!: FilterConfig[];
  @Output() filterChange = new EventEmitter<any>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({});
  }

  ngOnInit() {
    const group: any = {};
    this.filterConfig.forEach((config) => {
      group[config.key] = [''];
    });
    this.filterForm = this.fb.group(group);

    this.filterForm.valueChanges.subscribe((values) => {
      this.filterChange.emit(values);
    });
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filterChange.emit(this.filterForm.value);
  }
}
