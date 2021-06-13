import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable, of} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {UserJSON, UserModel} from "../models";
import firebase from "firebase";
import FirebaseUser = firebase.User;
import {AngularFirestore, CollectionReference} from "@angular/fire/firestore";
import DocumentReference = firebase.firestore.DocumentReference;

type CurrentUser = UserModel | null;

@Injectable({ providedIn: 'root' })
export class UserService {
  public readonly currentUser$: Observable<CurrentUser> = this.updateCurrentUser();
  public currentUser: CurrentUser = null;

  constructor(
    private readonly fireAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) {}

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
      .valueChanges({ idField: 'id' }).pipe(map(data => UserModel.fromDocumentData(data[0])));
  }

  signOut() {
    this.fireAuth.signOut();
  }

  get currentUserRef(): DocumentReference<UserJSON> {
    return this.firestore.doc<UserJSON>(`users/${this.currentUser!.id}`).ref;
  }

  loadUser(userId: string): Observable<UserModel | null> {
    return this.firestore.doc<UserJSON>(`users/${userId}`).get().pipe(
      map(doc => doc.exists ? UserModel.fromDocument(doc) : null)
    );
  }
}
