import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { combineLatest, from, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import {UserJSON, UserModel, UserService} from "../../shared";
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
    return combineLatest([
      this.firestore.collection<ChatJSON>('chats').valueChanges({ idField: 'id' }),
      this.userService.currentUser$
    ]).pipe(
      map(([chats]) => {
        return chats
          .map(json => ChatModel.fromDocumentData(json))
          .filter(chat => chat.isUserMember(this.userService.currentUser!.id));
      }),
      switchMap(chats => {
        return combineLatest(chats.map(chat => {
          const receiverId = chat.getReceiverId(this.userService.currentUser!.id);
          return this.firestore.doc<UserJSON>(`users/${receiverId}`).get().pipe(
            map((doc): ChatModel => {
              chat.receiver = UserModel.fromDocument(doc);
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
    return this.loadChats().pipe(
      switchMap(chats => {
        const chat = chats.find(chat => chat.isUserMember(targetUserId));
        if (chat) return of({ chatId: chat.id });

        const data: ChatJSON = {
          authorUserId: this.userService.currentUser!.id,
          targetUserId: targetUserId
        };

        return from(this.firestore.collection<ChatJSON>('chats').add(data)).pipe(
          map(doc => ({ chatId: doc.id }))
        );
      })
    );
  }

  loadChatById(chatId: string): Observable<ChatModel | null> {
    return this.firestore.doc<ChatJSON>(`chats/${chatId}`).get().pipe(
      map(doc => doc.exists ? ChatModel.fromDocument(doc) : null)
    );
  }
}
