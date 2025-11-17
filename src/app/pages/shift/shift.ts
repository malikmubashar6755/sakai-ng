import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { InputGroupAddon } from "primeng/inputgroupaddon";
import { InputGroup } from "primeng/inputgroup";
interface IShift {
  id: number;
  name: string;
  startTime: string; // or TimeSpan if you have a specific type
  endTime: string;   // or TimeSpan if you have a specific type
  isActive: boolean;
}
@Component({
  selector: 'app-shift',
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
    IconField,
    InputGroupAddon,
    InputGroup
],
  templateUrl: './shift.html',
  styleUrl: './shift.scss'
})
export class Shift implements OnInit {
  shiftForm!: FormGroup;
  shifts: IShift[] = [];
  submitted = false;
constructor(private fb: FormBuilder) {}
  // Make sure you have this initialization in your ngOnInit or constructor
  ngOnInit() {
    this.shiftForm = this.fb.group({
      Name: ['', Validators.required],
      StartTime: ['', Validators.required],
      EndTime: ['', Validators.required],
      IsActive: [false]
    });
  }
 onGlobalFilter(table: Table, event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    table.filterGlobal(searchTerm, 'contains');
  }
  onReset() {
    this.submitted = false;
    this.shiftForm.reset({
      Name: '',
      StartTime: '',
      EndTime: '',
      IsActive: false
    });
  }
   onSubmit() {
    this.submitted = true;
    
    if (this.shiftForm.valid) {
      const newShift: IShift = this.shiftForm.value;
      this.shifts.push(newShift);
      this.onReset();
      console.log('Departments:', this.shifts);
    } else {
      this.markFormGroupTouched(this.shiftForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.shiftForm.get(fieldName);
    return field ? (field.invalid && (field.touched || this.submitted)) : false;
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const control = this.shiftForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
      // You can add more error types as needed
    }
    return '';
  }
}