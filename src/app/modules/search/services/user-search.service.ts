import {Injectable} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {UserJSON, UserModel, UserService} from "../../shared";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable()
export class UserSearchService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) { }

  public search(): Observable<UserModel[]> {
    return combineLatest([
      this.firestore.collection<UserJSON>('users').valueChanges({idField: 'id'}),
      this.userService.currentUser$
    ]).pipe(
      map(([users]) => users.filter(user => user.id !== this.userService.currentUser?.id)),
      map(users => users
          .map((userJSON): UserModel => {
            const user = UserModel.fromDocumentData(userJSON);
            user.countInterestMatches(this.userService.currentUser!);
            user.isFavorite = this.userService.currentUser!.isFavoriteUser(user);
            return user;
          })
          .filter(user => !!user.interestsMatched)
          .sort((user1, user2) => user2.interestsMatched - user1.interestsMatched)
      )
    );
  }
}
