import {Injectable} from "@angular/core";
import {merge, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";
import CollectionReference = firebase.firestore.CollectionReference;
import {ChatJSON, FullChatJSON, FullMessageJSON, MessageJSON, MessageModel} from "../../messenger/models";
import {UserService} from "./user.service";
import {filter, map, skip, switchMap} from "rxjs/operators";
import Timestamp = firebase.firestore.Timestamp;

export interface MessageNotification {
  message: MessageModel;
  chatId: string;
}

@Injectable({ providedIn: 'root' })
export class MessengerNotificationService {
  public readonly notifications$: Observable<MessageNotification> = this.createNotificationsStream();

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly userService: UserService
  ) {}

  private createNotificationsStream(): Observable<MessageNotification> {
    return this.userService.currentUser$.pipe(
      filter(user => user?.isRegistrationFinished ?? false),
      switchMap(this.loadChats.bind(this)),
      switchMap((chats): Observable<MessageNotification> => {
        return merge(...chats.map(chat => this.listenUserMessages(chat).pipe(
          switchMap(this.createMessageModel.bind(this)),
          map((message): MessageNotification => ({message, chatId: chat.id}))
        )));
      })
    );
  }

  private loadChats(): Observable<FullChatJSON[]> {
    const queryChats = (ref: CollectionReference) => {
      return ref.where('members', 'array-contains', this.userService.currentUserRef);
    }
    return this.firestore.collection<ChatJSON>('chats', queryChats).valueChanges({ idField: 'id' })
  }

  private listenUserMessages(chat: FullChatJSON): Observable<FullMessageJSON> {
    const queryUserMessages = (ref: CollectionReference) => ref.where('authorRef', '!=', this.userService.currentUserRef)
    return this.firestore.collection<MessageJSON>(`chats/${chat.id}/messages`, queryUserMessages).valueChanges({ idField: 'id' }).pipe(
      skip(1),
      map(messages => this.getLastMessage(messages))
    );
  }

  private getLastMessage(messages: Array<FullMessageJSON>): FullMessageJSON {
    return messages.sort((m1, m2) => {
      const date1 = Number((m1.createdAt as unknown as Timestamp).toDate());
      const date2 = Number((m2.createdAt as unknown as Timestamp).toDate());
      return date2 - date1;
    })[0];
  }

  private createMessageModel(json: FullMessageJSON): Observable<MessageModel> {
    return this.userService.loadUser(json.authorRef.id).pipe(
      map(author => {
        const message = MessageModel.fromDocumentData(json);
        message.author = author;
        return message;
      })
    );
  }
}
