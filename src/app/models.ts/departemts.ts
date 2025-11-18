export interface Departments {
  id: number;
  companyId: number;
  name: string;
  isActive: boolean;
  createdBy: string;
  createdAt?: string; // or Date if you plan to parse it
  updatedBy: string | null;
  updatedAt?: string | null; // or Date if you plan to parse it
  company: Company;
}
export interface Company {
  id: number;
  name: string;
}
export interface CreateDepartment {
  companyId: number;
  name: string;
  isActive: boolean;
  createdBy: string;
}
export interface UpdateDepartment {
     Id: number;
  companyId: number;
  name: string;
  isActive: boolean;
  updatedBy: string;
}