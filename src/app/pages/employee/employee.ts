import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { Toast } from 'primeng/toast';
import { Toolbar } from "primeng/toolbar";
import { Dialog } from "primeng/dialog";
import { ConfirmDialog } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from 'primeng/api';
import { CreateEmployee, Employees } from '@/models.ts/employee';
import { FileUpload, FileUploadModule } from "primeng/fileupload";
import { DatePicker } from 'primeng/datepicker';
import { CompanyService } from '@/services/company-service';
import { Departmentservice } from '@/services/departmentservice';
import { Designationservice } from '@/services/designationservice';
import { Subject, takeUntil } from 'rxjs';
import { Department, Designations } from '@/models.ts/designations';
import { Employeeservice } from '@/services/employeeservice';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    Button,
    TextareaModule,
    CheckboxModule,
    MessageModule,
    TableModule,
    TagModule,
    InputIcon,
    SelectModule,
    IconField,
    Toolbar,
    Dialog,
    Toast,
    ConfirmDialog,
    FileUploadModule,
    DatePicker,
    Fluid
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './employee.html',
  styleUrl: './employee.scss'
})
export class Employee implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('dt') dt!: Table;

  employeeDialog: boolean = false;
  datetime12h: Date[] | undefined;
  employeeForm!: FormGroup;
  cols: any[] = [];
  employees: Employees[] = [];
  submitted: boolean = false;
  imageUrl: string | null = null;
  private destroy$ = new Subject<void>();
  selectedImageFile: File | null = null;
  // Dropdown Data Sources (You would usually fetch these from an API)
  departments: Department[] = [];
  designations: Designations[] = [];
  loading = false;
  genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' }
  ];



  constructor(private fb: FormBuilder, private messageService: MessageService, private dptservice: Departmentservice, private dgnservice: Designationservice, private empservice: Employeeservice) { }

  ngOnInit() {
    // 1. Initialize Reactive Form
    this.employeeForm = this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]], // Optional but must be valid email if present
      mobileNo: ['', Validators.required],
      cnic: ['', Validators.required],
      address: [''],
      dob: [null, Validators.required],
      hireDate: [null, Validators.required],
      isActive: [true],
      departmentId: [null, Validators.required],
      designationId: [null, Validators.required],
      genderId: [null, Validators.required]
    });
    this.getAllDesignations();
    this.getAllDepartments();
    this.getAllEmplyees();
    this.loadDemoData();
  }
  loadDemoData() {


    this.cols = [
      { field: 'empCode', header: 'Emp Code' },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'mobileNo', header: 'Mobile No' },
      { field: 'gender.name', header: 'Gender' },
      { field: 'department.name', header: 'Department' },
      { field: 'designation.title', header: 'Designation' },
      { field: 'isActive', header: 'Status' }
    ];
  }
  exportCSV() {
  const exportData = this.prepareExportData();
  this.dt.exportCSV();
}
prepareExportData() {
  return this.employees.map(e => ({
    EmpCode: e.empCode,
    FirstName: e.firstName,
    LastName: e.lastName,
    Email: e.email,
    MobileNo: e.mobileNo,
    Gender: e.gender?.name || '',
    Department: e.department?.name || '',
    Designation: e.desgination?.title || '',
    Status: e.isActive ? 'Active' : 'Inactive'
  }));
}
  openNew() {
    this.employeeForm.reset();
    this.employeeForm.patchValue({ isActive: true }); // Default to active
    this.submitted = false;
    this.employeeDialog = true;
    this.resetImage();
  }
  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (1MB)
      if (file.size > 1000000) {
        alert('File size should be less than 1MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // You can also store the file object if you need to upload it later
      // this.selectedImageFile = file;
    }
  }
  resetImage() {
    this.imageUrl = null;
    this.selectedImageFile = null;
    // Also reset the file input element
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
  editEmployee(employee: Employee) {
    // Patch values. Note: Dates might need conversion from String to Date object depending on API response
    this.employeeForm.patchValue({
      ...employee,

    });
    this.employeeDialog = true;
  }

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }
  onReset() {
    this.employeeForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      mobileNo: '',
      cnic: '',
      address: '',
      dob: null,
      hireDate: null,
      isActive: true,
      departmentId: null,
      designationId: null,
      genderId: null,
      imageUrl: ''
    });
    this.submitted = false;
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  onSubmit() {
    debugger;
    this.submitted = true;

    // Mark all fields as touched to trigger validation
    this.markFormGroupTouched(this.employeeForm);

    // DEBUG: Check which fields are invalid
    console.log('Form valid:', this.employeeForm.valid);
    console.log('Form errors:', this.employeeForm.errors);

    Object.keys(this.employeeForm.controls).forEach(key => {
      const control = this.employeeForm.get(key);
      if (control && control.invalid) {
        console.log(`Field ${key} is invalid:`, control.errors);
        console.log(`Field ${key} value:`, control.value);
      }
    });

    if (this.employeeForm.valid) {
      this.loading = true;

      // Create FormData instead of JSON object
      const formData = new FormData();

      // Append all form values
      formData.append('FirstName', this.employeeForm.value.firstName);
      formData.append('LastName', this.employeeForm.value.lastName);

      if (this.employeeForm.value.email) {
        formData.append('Email', this.employeeForm.value.email);
      }

      formData.append('MobileNo', this.employeeForm.value.mobileNo);
      formData.append('Cnic', this.employeeForm.value.cnic);

      if (this.employeeForm.value.address) {
        formData.append('Address', this.employeeForm.value.address);
      }

      // Format dates properly (adjust format as needed)
      if (this.employeeForm.value.dob) {
        const dobDate = this.formatDateForAPI(this.employeeForm.value.dob);
        formData.append('Dob', dobDate);
      }

      if (this.employeeForm.value.hireDate) {
        const hireDate = this.formatDateForAPI(this.employeeForm.value.hireDate);
        formData.append('HireDate', hireDate);
      }
      // this.companyId == 1;
      formData.append('IsActive', this.employeeForm.value.isActive.toString());
      formData.append('DepartmentId', this.employeeForm.value.departmentId.toString());
      formData.append('DesignationId', this.employeeForm.value.designationId.toString());
      formData.append('CompanyId', '1');
      formData.append('GenderId', this.employeeForm.value.genderId.toString());
      formData.append('CreatedBy', 'malik');

      // Append image file if exists
      // You need to track the file in a separate property, not imageUrl
      // Update your onImageSelect method to store the file
      if (this.selectedImageFile) {
        formData.append('ImageFile', this.selectedImageFile, this.selectedImageFile.name);
      }

      // Log FormData for debugging
      this.logFormData(formData);

      console.log('Submitting employee as FormData');

      // Call create employee service with FormData
      this.empservice.createEmployee(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            this.loading = false;
            const messageDetail = response.data || response.message || 'Employee created successfully.';

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: messageDetail
            });

            this.hideDialog(); // Close the dialog
            //this.getAllEmployees(); // Refresh the list
          },
          error: (error: any) => {
            this.loading = false;
            console.error('Error creating employee:', error);
            console.error('Error details:', error.error);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error?.message || 'Failed to create employee. Please try again.'
            });
          }
        });
    } else {
      console.warn('Form is invalid. Cannot submit.');
    }
  }

  // Add this helper method to format date for API
  private formatDateForAPI(date: any): string {
    if (!date) return '';

    let dateObj: Date;

    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string') {
      // Try to parse string date
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return '';
      }
    } else {
      // If it's some other format, try to convert
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return '';
      }
    }

    // Format as ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)
    // Or adjust format based on your API requirements
    return dateObj.toISOString();
  }

  // Add this helper method to log FormData contents
  private logFormData(formData: FormData) {
    console.log('=== FormData Contents ===');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    console.log('=========================');
  }
  private formatDate(date: any): Date {
    if (!date) return new Date();

    if (date instanceof Date) {
      return date;
    }

    // If it's a string, convert to Date
    return new Date(date);
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return field ? (field.invalid && (field.touched || this.submitted)) : false;
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
  getAllEmplyees() {
    this.loading = true;
    this.empservice.getAllEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.employees = res.data;
          this.loading = false;
          console.log('Employee data from API:', this.employees);
        },
        error: (error) => {
          console.error('Error fetching departments:', error);
          this.loading = false;
        }
      });
  }
  getAllDesignations() {
    this.loading = true;
    this.dgnservice.getAllDesignations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.designations = res.data;
          this.loading = false;
          console.log('Designation data from API:', this.designations);
        },
        error: (error) => {
          console.error('Error fetching departments:', error);
          this.loading = false;
        }
      });
  }
  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const control = this.employeeForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
    }
    return '';
  }
} 
