import {Injectable} from "@angular/core";
import {UserJSON, UserService} from "../../shared";
import {from, Observable, of} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {switchMap} from "rxjs/operators";
import {respondWithVoid} from "../../../operators";
import firebase from "firebase";
import User = firebase.User;

@Injectable()
export class AccountService {
  constructor(
    private readonly userService: UserService,
    private readonly fireAuth: AngularFireAuth
  ) {}

  public updateUser(attrs: Partial<UserJSON>): Observable<void> {
    return from(this.userService.currentUserRef.update(attrs));
  }

  public updateEmail(email: string): Observable<void> {
    return this.authUser$.pipe(
      this.doUserChange(user => from(user.updateEmail(email))),
      switchMap(() => this.updateUser({ email })),
      respondWithVoid
    );
  }

  private get authUser$(): Observable<User | null> {
    return from(this.fireAuth.currentUser);
  }

  private doUserChange<T = void>(action: (user: User) => Observable<T>) {
    return (source: Observable<User | null>): Observable<T | null> => {
      return source.pipe(
        switchMap(user => user ? action(user) : of(null))
      );
    }
  }

  public updatePassword(password: string): Observable<void> {
    return this.authUser$.pipe(
      this.doUserChange(user => from(user.updatePassword(password))),
      respondWithVoid
    );
  }
}
