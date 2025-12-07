import { ApiResponse } from '@/common/ApiResponse';
import { environment } from '@/environment/environment';
import { CreateDepartment, Departments, UpdateDepartment } from '@/models.ts/departemts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Departmentservice {
  private apiUrl = `${environment.apiUrl}/Department`;
  constructor(private http: HttpClient) { }
   getAllDepartments(): Observable<ApiResponse<Departments[]>> {
    return this.http.get<ApiResponse<Departments[]>>(`${this.apiUrl}/GetAllDepartments`);;
  }
   createDepartment(dept: CreateDepartment): Observable<ApiResponse<CreateDepartment>> {
      return this.http.post<ApiResponse<CreateDepartment>>(`${this.apiUrl}/CreateDepartment`, dept);
    }
    updateDepartment(id: number, dept: UpdateDepartment): Observable<ApiResponse<string>> {
      return this.http.put<ApiResponse<string>>(`${this.apiUrl}/UpdateDepartment?Id=${id}`, dept);
    }
}
