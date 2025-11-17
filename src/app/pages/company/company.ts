
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from "primeng/button";
import { Fluid } from "primeng/fluid";
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";

import { CompanyService } from '@/services/company-service';
import { Companies, NewCompany, UpdateCompany } from '@/models.ts/companies';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-company',
  standalone: true,
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
    ToastModule,
    IconField
],
providers: [
    MessageService // <--- ADD THIS LINE
  ],
  templateUrl: './company.html',
  styleUrls: ['./company.scss']
})
export class Company implements OnInit {
  companyForm!: FormGroup;
  submitted = false;
  companies: Companies[] = [];
  editingCompanyId: number | null = null;
  loading = false;
    @ViewChild('dt') dt: Table | undefined;

    onGlobalFilter(table: Table, event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value;
      table.filterGlobal(searchTerm, 'contains');
    }

  constructor(private fb: FormBuilder, private companyService: CompanyService,private service: MessageService) {}

  ngOnInit() {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
     phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      isActive: [false]
    });
this.getAllCompanies();
    // Initialize with dummy data
  
  }
 getAllCompanies() {
  this.loading = true;
    this.companyService.getAllCompanies().subscribe(res => {
      this.companies = res.data;
      console.log('Data coming from api', this.companies);
    });
  }
onEdit(company: Companies) {
  // Set the ID to track which company we are editing
  this.editingCompanyId = company.id; 

  // Populate the form with the selected company's data
  this.companyForm.patchValue({
    name: company.name,
    shortName: company.shortName,
    address: company.address,
    isActive: company.isActive,
    // Note: Mapped to 'email' and 'phone' form controls based on your HTML
    email: company.contactEmail, 
    phone: company.contactPhone,
    // createdBy is often excluded from the form, but keep it if required for update payload
    // createdBy: company.createdBy 
  });

  // Scroll to the form area if necessary
  window.scrollTo(0, 0); 
}
onSubmit() {
  debugger;
  this.submitted = true;
  // 1. Check form validity first for BOTH create and update
  if (this.companyForm.valid) {
    
    // 2. Decide between update and create inside the valid block
    if (this.editingCompanyId != null) {
      // --- Update Logic: Call the separate onUpdate method ---
      this.onUpdate(); 
      // No 'return' needed here, as the subscription handles the completion
      
    } else {
      // --- Create Logic: (Your existing code) ---
      const newCompany: NewCompany = { 
        name: this.companyForm.value.name,
        shortName: this.companyForm.value.shortName,
        address: this.companyForm.value.address,
        isActive: this.companyForm.value.isActive,
        contactEmail: this.companyForm.value.email, 
        contactPhone: this.companyForm.value.phone,
        createdBy: 'malik' 
      };
      
      this.companyService.createCompany(newCompany).subscribe({ 
        next: (response) => {
       const messageDetail: string = (response.data as unknown as string) || 'Company created successfully.';
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
    this.markFormGroupTouched(this.companyForm);
    
    // Optional: Add a console warning for clarity
    console.warn('Form is invalid. Cannot submit or update.');
  }
}

onUpdate() {
  const updatedCompany: UpdateCompany = {
    id: this.editingCompanyId!,
    name: this.companyForm.value.name,
    shortName: this.companyForm.value.shortName,
    address: this.companyForm.value.address,
    isActive: this.companyForm.value.isActive,
    contactEmail: this.companyForm.value.email,
    contactPhone: this.companyForm.value.phone,
    updatedBy: 'malik' 
  };
  this.companyService.updateCompany(updatedCompany.id, updatedCompany).subscribe({
    next: (response) => {
       const messageDetail: string = (response.data as unknown as string) || 'Company updated successfully.';
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
    this.companyForm.reset({
      fullName: '',
      shortName: '',
      email: '',
      phone: '',
      address: '',
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
    const field = this.companyForm.get(fieldName);
    return field ? (field.invalid && (field.touched || this.submitted)) : false;
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const control = this.companyForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
      if (control.errors['email']) return 'Please enter a valid email';
      if (control.errors['pattern']) return 'Please enter a valid 10-digit phone number';
      if (control.errors['minlength']) return 'Address should be at least 10 characters';
    }
    return '';
  }
}
