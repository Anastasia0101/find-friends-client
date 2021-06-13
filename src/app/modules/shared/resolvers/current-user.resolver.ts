import {Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {first, tap} from "rxjs/operators";
import {UserModel} from "../models";
import {UserService} from "../services";

@Injectable()
export class CurrentUserResolver implements Resolve<UserModel | null> {
  constructor(private readonly userService: UserService) {}

  resolve(): Observable<UserModel | null> {
    return this.userService.currentUser$.pipe(first());
  }
}
