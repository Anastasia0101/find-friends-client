import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserService} from "../services";
import {map} from "rxjs/operators";

@Injectable()
export class AuthOnlyGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.userService.currentUser$.pipe(
      map(user => {
        if (!user) return this.router.createUrlTree(['/auth']);
        if (user.isRegistrationFinished) return true;
        return this.router.createUrlTree(['/auth/sign-up'], {
          queryParams: { progress: 'email-verified', id: user.id }
        });
      })
    );
  }
}
