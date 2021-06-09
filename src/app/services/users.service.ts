import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../modules/shared/services/user.service';

@Injectable()
export class UsersService {

  items!: Observable<User[]>;

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) { }

  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges({idField: 'id'}).pipe(
      map((users) => users.filter(user => user.id !== this.userService.currentUser?.id))
    );
  }
}
