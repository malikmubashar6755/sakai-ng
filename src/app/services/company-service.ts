import { ApiResponse } from '@/common/ApiResponse';
import { environment } from '@/environment/environment';
import { Companies, NewCompany, UpdateCompany } from '@/models.ts/companies';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/Company`;
  constructor(private http: HttpClient) { }
   getAllCompanies(): Observable<ApiResponse<Companies[]>> {
    return this.http.get<ApiResponse<Companies[]>>(`${this.apiUrl}/GetAllCompanies`);;
  }
  createCompany(company: NewCompany): Observable<ApiResponse<NewCompany>> {
    return this.http.post<ApiResponse<NewCompany>>(`${this.apiUrl}/CreateCompany`, company);
  }updateCompany(id: number, company: UpdateCompany): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.apiUrl}/UpdateCompany?Id=${id}`, company);
  }
}
