import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { loginRequest } from './models/loginRequest';
import { loginResponse } from './models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = `${environment.authenticationURL}/User/Login()`;

  constructor(private http: HttpClient) {}

  login(credentials: loginRequest): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.loginUrl, credentials);
  }
}
