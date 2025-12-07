import { Departments } from '@/models.ts/departemts';
import { CreateDesignation, Designations, UpdateDesignation } from '@/models.ts/designations';
import { Departmentservice } from '@/services/departmentservice';
import { Designationservice } from '@/services/designationservice';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Fluid } from 'primeng/fluid';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { Toast } from "primeng/toast";
import { Subject, takeUntil } from 'rxjs';
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
    IconField,
    SelectModule,
    Toast
  ],
  providers: [
    MessageService // <--- ADD THIS LINE
  ],
  templateUrl: './designation.html',
  styleUrl: './designation.scss'
})
export class Designation implements OnInit, OnDestroy {
  designationForm!: FormGroup;
  submitted = false;
  designations: Designations[] = [];
  departments: Departments[] = [];
  @ViewChild('dt') dt: Table | undefined;
  loading = false;
  editingDesignationId: number | null = null;
  private destroy$ = new Subject<void>();
  onGlobalFilter(table: Table, event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    table.filterGlobal(searchTerm, 'contains');
  }

  constructor(private fb: FormBuilder, private dgnservice: Designationservice, private dptservice: Departmentservice, private service: MessageService) { }


  ngOnInit() {
    this.designationForm = this.fb.group({
      departmentId: ['', [Validators.required]],
      title: ['', [Validators.required]],
      isActive: [false]
    });

    this.getAllDepartments();
    this.getAllDesignations();
  }
  getAllDesignations() {
    this.loading = true;
    this.dgnservice.getAllDesignations().subscribe(res => {
      this.designations = res.data;
      console.log('Designations data from API:', this.designations);
    });
  }

  getAllDepartments() {
    this.loading = true;
    this.dptservice.getAllDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.departments = res.data;
          this.loading = false;
          console.log('Departments data from API:', this.departments);
        },
        error: (error) => {
          console.error('Error fetching departments:', error);
          this.loading = false;
        }
      });
  }
  onEdit(dgn: Designations) {
    console.log('Full designation l object:', dgn);
    console.log('Department object:', dgn.department);
    console.log('Department ID:', dgn.department?.id);
    debugger;
    if (!dgn) {
      console.error('Designation is undefined');
      return;
    }
    this.editingDesignationId = dgn.id;
    this.designationForm.patchValue({
      departmentId: dgn.department.id,
      title: dgn.title,
      isActive: dgn.isActive
    });

    // Scroll to the form area if necessary
    window.scrollTo(0, 0);
  }
  onSubmit() {
    debugger;
    this.submitted = true;
    // 1. Check form validity first for BOTH create and update
    if (this.designationForm.valid) {

      // 2. Decide between update and create inside the valid block
      if (this.editingDesignationId != null) {
        // --- Update Logic: Call the separate onUpdate method ---
        this.onUpdate();
        // No 'return' needed here, as the subscription handles the completion

      } else {
        // --- Create Logic: (Your existing code) ---
        const newdesignation: CreateDesignation = {
          departmentId: this.designationForm.value.departmentId,
          title: this.designationForm.value.title,
          isActive: this.designationForm.value.isActive,
          createdBy: 'malik'
        };

        this.dgnservice.createDesignation(newdesignation).subscribe({
          next: (response) => {
            const messageDetail: string = (response.data as unknown as string) || 'Department created successfully.';
            this.service.add({ severity: 'success', summary: 'Success', detail: messageDetail });
            this.onReset();
            this.getAllDesignations();
          },
          error: (err) => {
            console.error('Error creating company:', err);
          }
        });
      }
    } else {
      // 3. Handle invalid form (applies to both create and update)
      this.markFormGroupTouched(this.designationForm);

      // Optional: Add a console warning for clarity
      console.warn('Form is invalid. Cannot submit or update.');
    }
  }

  onUpdate() {
    const updateddesignation: UpdateDesignation = {
      Id: this.editingDesignationId!,
      title: this.designationForm.value.title,
      departmentId: this.designationForm.value.departmentId,
      isActive: this.designationForm.value.isActive,
      updatedBy: 'malik'
    };
    this.dgnservice.updateDesignation(updateddesignation.Id, updateddesignation).subscribe({
      next: (response) => {
        const messageDetail: string = (response.data as unknown as string) || 'Department updated successfully.';
        this.service.add({ severity: 'success', summary: 'Success', detail: messageDetail });
        this.onReset();
        this.getAllDesignations();
      },
      error: (err) => {
        console.error('Error updating company:', err);
      }
    });
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
