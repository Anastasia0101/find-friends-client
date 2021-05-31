import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAuth } from '../models/user-auth.model';
import { environment } from '../../environments/environment';

@Injectable()
export class UserAuthService {

  constructor(private httpClient: HttpClient) {}

  login(nickname: string, password: string): Observable<UserAuth> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.httpClient.post<UserAuth>(url, {nickname, password}).pipe(
      tap((response) => this.saveUserToken(response.access_token))
    );
  }

  saveUserToken(token: string): void {
    localStorage.setItem('auth', token);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('auth')) {
      return true;
    }
    return false;
  }
}
