import {Injectable} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {UserJSON, UserModel, UserService} from "../../shared";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

interface SearchWrapper {
  user: UserModel;
  matches: number;
}

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
          .map((userJSON): SearchWrapper => {
            const user = UserModel.fromDocumentData(userJSON);
            return {user, matches: this.countMatches(user)};
          })
          .filter(user => !!user.matches)
          .sort((user1, user2) => user2.matches - user1.matches)
          .map(user => user.user)
      )
    );
  }

  public countMatches(user: UserModel): number {
    let counter = 0;
    this.userService.currentUser?.interests.forEach(interest => {
      if (user.interests.includes(interest)) counter++;
    });
    return counter;
  }
}
