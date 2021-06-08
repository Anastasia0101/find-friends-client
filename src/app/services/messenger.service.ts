import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../models/messenger/chat.model';

@Injectable()
export class MessengerService {

  constructor(private firestore: AngularFirestore) { }

  getChats(): Observable<Chat[]> {
    return this.firestore.collection<Chat>('chats').valueChanges();
  }
}
