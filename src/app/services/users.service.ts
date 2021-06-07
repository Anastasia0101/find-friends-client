import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  items!: Observable<User[]>;

  constructor(private firestore: AngularFirestore) { }

  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges();
  }
}
