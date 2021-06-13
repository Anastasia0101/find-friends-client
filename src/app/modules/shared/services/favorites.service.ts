import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {UserService} from "./user.service";
import {UserJSON, UserModel} from "../models";
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";
import CollectionReference = firebase.firestore.CollectionReference;
import {map} from "rxjs/operators";
import FieldPath = firebase.firestore.FieldPath;

@Injectable()
export class FavoritesService {
  constructor(
    private readonly userService: UserService,
    private readonly firestore: AngularFirestore
  ) {}

  public addUser(userId: string): Observable<void> {
    const favoriteUsers = [
      ...this.userService.currentUser?.favoriteUsers || [],
      this.userService.makeUserRef(userId)
    ]
    return this.userService.updateCurrentUser({ favoriteUsers })
  }

  public removeUser(userId: string): Observable<void> {
    const favoriteUsers = this.userService.currentUser!.favoriteUsers.filter(userRef => userRef.id !== userId);
    return this.userService.updateCurrentUser({ favoriteUsers });
  }

  public loadUsers(): Observable<UserModel[]> {
    if (!this.userService.currentUser?.favoriteUsers.length) return of([]);

    const queryFavorites = (ref: CollectionReference) => {
      return ref.where(FieldPath.documentId(), 'in', this.userService.currentUser!.favoriteUsers)
    }

    return this.firestore.collection<UserJSON>('users', queryFavorites).get().pipe(
      map(query => query.docs.map(doc => UserModel.fromDocument(doc)))
    );
  }
}
