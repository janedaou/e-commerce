import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SignupRequest } from './models/signupRequest';
import { SignupResponse } from './models/signupResponse';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = `${environment.authenticationURL}/User/SignUp()`;

  constructor(private http: HttpClient) {}

  signup(signupData: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.apiUrl, signupData);
  }
}