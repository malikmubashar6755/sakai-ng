
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

interface ICompany {
  fullName: string;
  shortName: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
}

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
    IconField
],
  templateUrl: './company.html',
  styleUrls: ['./company.scss']
})
export class Company implements OnInit {
  companyForm!: FormGroup;
  submitted = false;
  companies: ICompany[] = [];
    @ViewChild('dt') dt: Table | undefined;

    onGlobalFilter(table: Table, event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value;
      table.filterGlobal(searchTerm, 'contains');
    }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.companyForm = this.fb.group({
      fullName: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      isActive: [false]
    });

    // Initialize with dummy data
    this.companies = [
      {
        fullName: 'Tech Solutions International',
        shortName: 'TSI',
        email: 'info@techsolutions.com',
        phone: '9876543210',
        address: '123 Innovation Drive, Tech Park, Silicon Valley, CA 94025',
        isActive: true
      },
      {
        fullName: 'Global Data Systems',
        shortName: 'GDS',
        email: 'contact@gds.com',
        phone: '8765432109',
        address: '456 Data Center Road, Business Hub, New York, NY 10001',
        isActive: true
      },
      {
        fullName: 'Innovative Software Solutions',
        shortName: 'ISS',
        email: 'info@innosoft.com',
        phone: '7654321098',
        address: '789 Software Avenue, Tech District, Austin, TX 78701',
        isActive: false
      },
      {
        fullName: 'Digital Dynamics Corporation',
        shortName: 'DDC',
        email: 'contact@digidyn.com',
        phone: '6543210987',
        address: '321 Digital Boulevard, Cyber City, Seattle, WA 98101',
        isActive: true
      },
      {
        fullName: 'Smart Systems Ltd',
        shortName: 'SSL',
        email: 'info@smartsys.com',
        phone: '5432109876',
        address: '567 Smart Street, Innovation Park, Boston, MA 02108',
        isActive: false
      }
    ];
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.companyForm.valid) {
      const newCompany: ICompany = this.companyForm.value;
      this.companies.push(newCompany);
      this.onReset();
      console.log('Companies:', this.companies);
    } else {
      this.markFormGroupTouched(this.companyForm);
    }
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
