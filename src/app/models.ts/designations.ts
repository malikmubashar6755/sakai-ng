export interface Designations {
  id: number;
  departmentId: number;
  title: string;
  isActive: boolean;
  createdBy: string;
  department: Department;
}
export interface Department {
  id: number;
  name: string;
}
export interface CreateDesignation {
  departmentId: number;
  title: string;
  isActive: boolean;
  createdBy: string;
}
export interface UpdateDesignation {
  Id: number;
  departmentId: number;
  title: string;
  isActive: boolean;
  updatedBy: string;
}