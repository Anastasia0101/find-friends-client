import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationFormValue } from '../models/user-registration/registration-form-value.model';

@Injectable()
export class UserRegistrationService {

  constructor(private httpClient: HttpClient) {}

  addNewUser(userData: RegistrationFormValue): Observable<RegistrationFormValue> {
    const url = 'http://localhost:3000/users';
    return this.httpClient.post<RegistrationFormValue>(url, userData);
  }
}
