import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { combineLatest, from, Observable, of } from "rxjs";
import { first, map, switchMap } from "rxjs/operators";
import { Chat } from "../modules/messenger/models/chat.model";
import { UserJSON, UserModel, UserService } from "../modules/shared";

interface NewChat {
  chatId: string;
}

@Injectable()
export class ChatsService {

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) { }

  public loadChats(): Observable<Chat[]> {
    const userId = this.userService.currentUser?.id;

    return this.firestore.collection<Chat>('chats').valueChanges({ idField: 'id' }).pipe(
      map(chats => chats.filter(chat => chat.authorUserId === userId || chat.targetUserId === userId)),
      switchMap(chats => {
        const usersLoading = chats.map(chat => {
          const receiverId = userId === chat.authorUserId ? chat.targetUserId : chat.authorUserId;
          return this.firestore.doc<UserJSON>(`users/${receiverId}`).get().pipe(
            first(),
            map((doc): Chat => ({
              ...chat,
              receiver: UserModel.fromDocument(doc)
            }))
          )
        });
        return combineLatest(usersLoading);
      })
    );
  }

  createChat(targetUserId: string): Observable<NewChat> {
    return this.loadChats().pipe(
      switchMap(chats => {
        const chat = chats.find(chat => chat.authorUserId === targetUserId || chat.targetUserId === targetUserId);
        if (chat) return of({ chatId: chat.id });

        const data = {
          id: this.firestore.createId(),
          authorUserId: this.userService.currentUser!.id,
          targetUserId: targetUserId
        };

        return from(this.firestore.collection<Chat>('chats').add(data)).pipe(
          map(doc => ({ chatId: doc.id }))
        );
      })
    );
  }

  loadChatById(chatId: string): Observable<Chat | undefined> {
    return this.firestore.doc<Chat>(`chats/${chatId}`).valueChanges({idField: 'id'});
  }
}
