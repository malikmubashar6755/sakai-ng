import { ApiResponse } from '@/common/ApiResponse';
import { environment } from '@/environment/environment';
import { CreateDesignation, Designations, UpdateDesignation } from '@/models.ts/designations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Designationservice {
  private apiUrl = `${environment.apiUrl}/Designation`;
  constructor(private http: HttpClient) { }
  getAllDesignations(): Observable<ApiResponse<Designations[]>> {
    return this.http.get<ApiResponse<Designations[]>>(`${this.apiUrl}/GetAllDesignations`);;
  }
  createDesignation(dgn: CreateDesignation): Observable<ApiResponse<CreateDesignation>> {
    return this.http.post<ApiResponse<CreateDesignation>>(`${this.apiUrl}/CreateDesignation`, dgn);
  }
  updateDesignation(id: number, dept: UpdateDesignation): Observable<ApiResponse<string>> {
        return this.http.put<ApiResponse<string>>(`${this.apiUrl}/UpdateDesignation?Id=${id}`, dept);
      }
}
