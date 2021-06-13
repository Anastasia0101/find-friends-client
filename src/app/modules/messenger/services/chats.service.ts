import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { combineLatest, from, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import {UserService} from "../../shared";
import {ChatJSON, ChatModel, MessageJSON, MessageModel} from "../models";
import firebase from "firebase";
import CollectionReference = firebase.firestore.CollectionReference;

interface NewChat {
  chatId: string;
}

@Injectable()
export class ChatsService {

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) { }

  public loadChats(): Observable<ChatModel[]> {
    const queryChats = (ref: CollectionReference) => {
      return ref.where('members', 'array-contains', this.userService.currentUserRef);
    }
    return this.firestore.collection<ChatJSON>('chats', queryChats).valueChanges({ idField: 'id' }).pipe(
      map((chats) => chats.map(json => ChatModel.fromDocumentData(json))),
      switchMap(chats => {
        return combineLatest(chats.map(chat => {
          const receiverId = chat.getReceiverId(this.userService.currentUser!.id);
          return this.userService.loadUser(receiverId).pipe(
            map((receiver): ChatModel => {
              chat.receiver = receiver!;
              return chat
            })
          )
        }));
      })
    );
  }

  public loadLastMessage(chat: ChatModel): Observable<MessageModel | null> {
    const queryLastMessage = (ref: CollectionReference) => ref.orderBy('createdAt', 'desc').limit(1);
    return this.firestore.collection<MessageJSON>(`chats/${chat.id}/messages`, queryLastMessage).valueChanges({ idField: 'id' }).pipe(
      map(messages => messages.length ? MessageModel.fromDocumentData(messages[0]) : null)
    )
  }

  createChat(targetUserId: string): Observable<NewChat> {
    const members = [
      this.userService.makeUserRef(targetUserId),
      this.userService.currentUserRef
    ]
    const queryUserChat = (ref: CollectionReference) => {
      return ref.where('members', 'array-contains-any', members);
    }
    return this.firestore.collection<ChatJSON>('chats', queryUserChat).get().pipe(
      switchMap(query => {
        if (query.empty) {
          return from(this.firestore.collection<ChatJSON>('chats').add({members})).pipe(
            map(doc => ({ chatId: doc.id }))
          );
        }
        return of({ chatId: query.docs[0].id });
      })
    );
  }

  loadChatById(chatId: string): Observable<ChatModel | null> {
    return this.firestore.doc<ChatJSON>(`chats/${chatId}`).get().pipe(
      map(doc => doc.exists ? ChatModel.fromDocument(doc) : null)
    );
  }
}
