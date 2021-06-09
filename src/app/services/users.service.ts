import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService, UserJSON, UserModel } from '../modules/shared';

@Injectable()
export class UsersService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) { }

  getUsers(): Observable<UserModel[]> {
    return this.firestore.collection<UserJSON>('users').valueChanges({idField: 'id'}).pipe(
      map((users) => users.filter(user => user.id !== this.userService.currentUser?.id)),
      map(users => users.map(userJSON => UserModel.fromDocumentData(userJSON)))
    );
  }
}
