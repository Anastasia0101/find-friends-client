import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {UserModel, UserService} from "../../shared";
import {Injectable} from "@angular/core";
import {combineLatest, EMPTY, Observable, of} from "rxjs";
import {first, switchMap} from "rxjs/operators";

@Injectable()
export class UserResolver implements Resolve<UserModel> {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
    return combineLatest([
      this.userService.currentUser$.pipe(first()),
      this.userService.loadUser(route.params.id)
    ]).pipe(
      switchMap(([currentUser, user]) => {
        if (user) {
          user.countInterestMatches(currentUser!);
          return of(user);
        }
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}
