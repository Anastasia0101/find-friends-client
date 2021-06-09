import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserService} from "../services";
import {map} from "rxjs/operators";

@Injectable()
export class InauthOnlyGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.userService.currentUser$.pipe(
      map(user => user && user.isRegistrationFinished ? this.router.createUrlTree(['/home']) : true)
    );
  }
}
