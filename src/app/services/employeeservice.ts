import { ApiResponse } from '@/common/ApiResponse';
import { environment } from '@/environment/environment';
import { CreateEmployee, Employees } from '@/models.ts/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Employeeservice {
  private apiUrl = `${environment.apiUrl}/Employee`;
  constructor(private http: HttpClient) { }
  getAllEmployees(): Observable<ApiResponse<Employees[]>> {
    return this.http.get<ApiResponse<Employees[]>>(`${this.apiUrl}/GetAllEmployees`);;
  }
  createEmployee(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateEmployee`, formData);
  }
  // updateDesignation(id: number, dept: UpdateDesignation): Observable<ApiResponse<string>> {
  //       return this.http.put<ApiResponse<string>>(`${this.apiUrl}/UpdateDesignation?Id=${id}`, dept);
  //     }
}
