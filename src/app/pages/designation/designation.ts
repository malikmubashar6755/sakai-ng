import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
interface IDesignation {
  Departmentid: string;
  Name: string;
  isActive: boolean;
}
@Component({
  selector: 'app-designation',
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
  templateUrl: './designation.html',
  styleUrl: './designation.scss'
})
export class Designation {
  designationForm!: FormGroup;
  submitted = false;
  designations: IDesignation[] = [];
  @ViewChild('dt') dt: Table | undefined;

  onGlobalFilter(table: Table, event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    table.filterGlobal(searchTerm, 'contains');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.designationForm = this.fb.group({
      Departmentid: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      isActive: [false]
    });

    // Initialize with dummy data
    this.designations = [
      {
        Departmentid: 'DEPT001', // HR Department
        Name: 'HR Manager',
        isActive: true
      },
      {
        Departmentid: 'DEPT001',
        Name: 'Recruitment Specialist',
        isActive: true
      },
      {
        Departmentid: 'DEPT001',
        Name: 'Training Coordinator',
        isActive: true
      },
      {
        Departmentid: 'DEPT002', // IT Department
        Name: 'Software Engineer',
        isActive: true
      },
      {
        Departmentid: 'DEPT002',
        Name: 'System Administrator',
        isActive: true
      },
      {
        Departmentid: 'DEPT002',
        Name: 'IT Support Specialist',
        isActive: false
      },
      {
        Departmentid: 'DEPT003', // Finance Department
        Name: 'Finance Manager',
        isActive: true
      },
      {
        Departmentid: 'DEPT003',
        Name: 'Accountant',
        isActive: true
      },
      {
        Departmentid: 'DEPT003',
        Name: 'Financial Analyst',
        isActive: true
      },
      {
        Departmentid: 'DEPT004', // Marketing Department
        Name: 'Marketing Manager',
        isActive: true
      },
      {
        Departmentid: 'DEPT004',
        Name: 'Digital Marketing Specialist',
        isActive: false
      },
      {
        Departmentid: 'DEPT004',
        Name: 'Content Writer',
        isActive: true
      },
      {
        Departmentid: 'DEPT005', // Operations Department
        Name: 'Operations Manager',
        isActive: true
      },
      {
        Departmentid: 'DEPT005',
        Name: 'Logistics Coordinator',
        isActive: true
      },
      {
        Departmentid: 'DEPT005',
        Name: 'Quality Assurance Officer',
        isActive: false
      }
    ];
  }

  onSubmit() {
    this.submitted = true;

    if (this.designationForm.valid) {
      const newDepartment: IDesignation = this.designationForm.value;
      this.designations.push(newDepartment);
      this.onReset();
      console.log('Departments:', this.designations);
    } else {
      this.markFormGroupTouched(this.designationForm);
    }
  }

  onReset() {
    this.submitted = false;
    this.designationForm.reset({
      Departmentid: '',
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
    const field = this.designationForm.get(fieldName);
    return field ? (field.invalid && (field.touched || this.submitted)) : false;
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const control = this.designationForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
    }
    return '';
  }
}
