import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuth } from '../models/user-auth.model';
import { environment } from '../../environments/environment';

@Injectable()
export class UserAuthService {

  constructor(private httpClient: HttpClient) {}

  login(nickname: string, password: string): Observable<UserAuth> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.httpClient.post<UserAuth>(url, {nickname: nickname, password: password});
  }

  getUsers(): Observable<UserAuth[]> {
    const url = 'http://localhost:3000/users';
    return this.httpClient.get<UserAuth[]>(url);
  }
}
