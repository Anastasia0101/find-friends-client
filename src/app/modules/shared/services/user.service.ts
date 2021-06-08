import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable, of} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {UserModel} from "../models";
import firebase from "firebase";
import FirebaseUser = firebase.User;
import {AngularFirestore, CollectionReference} from "@angular/fire/firestore";

type CurrentUser = UserModel | null;
interface UserJSON {
  authId: string;
  nickname: string;
  isRegistrationFinished: boolean;
}

@Injectable()
export class UserService {
  private readonly currentUser$: Observable<CurrentUser> = this.updateCurrentUser();
  public currentUser: CurrentUser = null;

  constructor(
    private readonly fireAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) {}

  public get isAuthenticated$(): Observable<boolean> {
    return this.currentUser$.pipe(map(user => !!user));
  }

  private updateCurrentUser(): Observable<CurrentUser> {
    return this.fireAuth.authState.pipe(
      switchMap((user: FirebaseUser | null) => user ? this.loadCurrentUser(user) : of(null)),
      tap(user => this.currentUser = user)
    );
  }

  private loadCurrentUser(user: FirebaseUser): Observable<CurrentUser> {
    const queryCurrentUser = (ref: CollectionReference) => ref.where('authId', '==', user.uid);

    return this.firestore
      .collection<UserJSON>('users', queryCurrentUser)
      .get().pipe(
        map(query => UserModel.fromDocument(query.docs[0])!),
        map(user => user.isRegistrationFinished ? user : null)
      );
  }
}
