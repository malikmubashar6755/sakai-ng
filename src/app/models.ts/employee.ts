export interface Employees {
    id?: number;
    firstName: string;
    lastName: string;
    empCode: string;
    email?: string;
    mobileNo: string;
    cnic: string;
    address?: string;
    dob: Date;
    hireDate: Date;
    isActive: boolean;
    departmentId: number;
    designationId: number;
    genderId: number;
    imageUrl?: string;
    // Nested objects for display purposes in the table
    department?: any; 
    desgination?: EmpDesignation;
    gender: Gender;
}
export interface EmpDesignation{
id: number;
 title: string;
}
export interface Gender{
id: number;
 name: string;
}
export interface CreateEmployee {
    firstName: string;
    lastName: string;   
     email?: string;
    mobileNo: string;
    cnic: string;
    address?: string;
    dob: Date;
    hireDate: Date;
    isActive: boolean;
    departmentId: number;
    designationId: number;
    genderId: number;
    imageUrl?: string;
    createdBy?: string;
}