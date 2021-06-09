import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat } from '../models/chat.model';

@Injectable()
export class MessengerService {

  constructor(private firestore: AngularFirestore) { }

  getChats(): Observable<Chat[]> {
    return this.firestore.collection<Chat>('chats').valueChanges({ idField: 'id' })
  }
}
