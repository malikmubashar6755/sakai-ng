import { Companies } from '@/models.ts/companies';
import { CreateDepartment, Departments, UpdateDepartment } from '@/models.ts/departemts';
import { CompanyService } from '@/services/company-service';
import { Departmentservice } from '@/services/departmentservice';
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
import { Select, SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { Subject, takeUntil } from 'rxjs';
import { Toast } from "primeng/toast";
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
    SelectModule,
    IconField,
    Toast
],
  providers: [
    MessageService // <--- ADD THIS LINE
  ],
  templateUrl: './department.html',
  styleUrl: './department.scss'
})

export class Department implements OnInit,OnDestroy  {
  departmentForm!: FormGroup;
  submitted = false;
  departments: Departments[] = [];
  loading = false;
  companies: Companies[] = [];
  @ViewChild('dt') dt: Table | undefined;
   editingdeptId: number | null = null;
private destroy$ = new Subject<void>();
  onGlobalFilter(table: Table, event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    table.filterGlobal(searchTerm, 'contains');
  }

  constructor(private fb: FormBuilder, private cmpyservice: CompanyService,private dptservice: Departmentservice,private service: MessageService) { }
 

  ngOnInit() {
    this.departmentForm = this.fb.group({
      companyId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      isActive: [false]
    });
    this.getAllCompanies();  
  this.getAllDepartments();
  }
getAllCompanies() {
    this.loading = true;
    this.cmpyservice.getAllCompanies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.companies = res.data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching companies:', error);
          this.loading = false;
        }
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
 onEdit(dept: Departments) {
   // Set the ID to track which company we are editing
   this.editingdeptId = dept.id; 
 
   // Populate the form with the selected company's data
   this.departmentForm.patchValue({
     companyId: dept.company.id,
     name: dept.name,
     isActive: dept.isActive,
   });
 
   // Scroll to the form area if necessary
   window.scrollTo(0, 0); 
 }
 onSubmit() {
   debugger;
   this.submitted = true;
   // 1. Check form validity first for BOTH create and update
   if (this.departmentForm.valid) {
     
     // 2. Decide between update and create inside the valid block
     if (this.editingdeptId != null) {
       // --- Update Logic: Call the separate onUpdate method ---
       this.onUpdate(); 
       // No 'return' needed here, as the subscription handles the completion
       
     } else {
       // --- Create Logic: (Your existing code) ---
       const newdepartment: CreateDepartment = { 
         companyId: this.departmentForm.value.companyId,
         name: this.departmentForm.value.name,
         isActive: this.departmentForm.value.isActive,
         createdBy: 'malik' 
       };
       
       this.dptservice.createDepartment(newdepartment).subscribe({ 
         next: (response) => {
        const messageDetail: string = (response.data as unknown as string) || 'Department created successfully.';
         this.service.add({ severity: 'success', summary: 'Success', detail: messageDetail });
           this.onReset();
           this.getAllCompanies(); 
         },
         error: (err) => {
           console.error('Error creating company:', err);
         }
       });
     }
   } else {
     // 3. Handle invalid form (applies to both create and update)
     this.markFormGroupTouched(this.departmentForm);
     
     // Optional: Add a console warning for clarity
     console.warn('Form is invalid. Cannot submit or update.');
   }
 }
 
 onUpdate() {
   const updatedCompany: UpdateDepartment = {
     Id: this.editingdeptId!,
     name: this.departmentForm.value.name,
     companyId: this.departmentForm.value.companyId,
     isActive: this.departmentForm.value.isActive,
     updatedBy: 'malik' 
   };
   this.dptservice.updateDepartment(updatedCompany.Id, updatedCompany).subscribe({
     next: (response) => {
        const messageDetail: string = (response.data as unknown as string) || 'Department updated successfully.';
         this.service.add({ severity: 'success', summary: 'Success', detail: messageDetail });
       this.onReset();
       this.getAllCompanies();
     },
     error: (err) => {
       console.error('Error updating company:', err);
     }
   });
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


