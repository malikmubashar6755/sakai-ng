import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Button } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Fluid } from 'primeng/fluid';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
interface IDepartment {
  Companyid: string;
  Name: string;
  isActive: boolean;
}

@Component({
  selector: 'app-department',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    Button,
    TextareaModule,
    Fluid,
    CheckboxModule,
    MessageModule,
    TableModule,
    TagModule,
    InputIcon,
    IconField
  ],
  templateUrl: './department.html',
  styleUrl: './department.scss'
})

export class Department implements OnInit {
  departmentForm!: FormGroup;
  submitted = false;
  departments: IDepartment[] = [];
  @ViewChild('dt') dt: Table | undefined;

  onGlobalFilter(table: Table, event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    table.filterGlobal(searchTerm, 'contains');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.departmentForm = this.fb.group({
      Companyid: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      isActive: [false]
    });

    // Initialize with dummy data
    this.departments = [
      {
        Companyid: 'COMP001',
        Name: 'Human Resources',
        isActive: true
      },
      {
        Companyid: 'COMP001',
        Name: 'Information Technology',
        isActive: true
      },
      {
        Companyid: 'COMP001',
        Name: 'Finance',
        isActive: true
      },
      {
        Companyid: 'COMP001',
        Name: 'Marketing',
        isActive: false
      },
      {
        Companyid: 'COMP001',
        Name: 'Operations',
        isActive: true
      }
    ];
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.departmentForm.valid) {
      const newDepartment: IDepartment = this.departmentForm.value;
      this.departments.push(newDepartment);
      this.onReset();
      console.log('Departments:', this.departments);
    } else {
      this.markFormGroupTouched(this.departmentForm);
    }
  }

  onReset() {
    this.submitted = false;
    this.departmentForm.reset({
      Companyid: '',
      Name: '',
      isActive: false
    });
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper method to check if field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.departmentForm.get(fieldName);
    return field ? (field.invalid && (field.touched || this.submitted)) : false;
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const control = this.departmentForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
    }
    return '';
  }
}