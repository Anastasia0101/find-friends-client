import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public authService: UserAuthService,
    public router: Router) {}

  canActivate(): boolean {
    console.log(this.authService.isAuthenticated());
    if (!this.authService.isAuthenticated()) {
      void this.router.navigate(['main']);
      return false;
    }
    return true;
  }
}
