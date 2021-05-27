import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationFormValue } from '../models/user-registration/registration-form-value.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class UserRegistrationService {

  constructor(private httpClient: HttpClient) {}

  getUserById(userId: number): Observable<User> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.httpClient.get<User>(url);
  }

  addNewUser(userData: RegistrationFormValue): Observable<RegistrationFormValue> {
    const url = 'http://localhost:3000/users';
    return this.httpClient.post<RegistrationFormValue>(url, userData);
  }
}
