import {Injectable} from "@angular/core";
import {ChatModel, MessageJSON, MessageModel} from "../models";
import {combineLatest, from, Observable, of} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {ChatsService} from "./chats.service";
import {UserService} from "../../shared";
import {AngularFirestore, CollectionReference} from "@angular/fire/firestore";
import {respondWithVoid} from "../../../operators";

type ActiveChat = ChatModel | null;

@Injectable()
export class ChatService {
  public activeChat: ActiveChat = null;
  public messages$: Observable<MessageModel[]> = of([]);

  constructor(
    private readonly chatsService: ChatsService,
    private readonly userService: UserService,
    private readonly firestore: AngularFirestore
  ) {}

  public activateChat(chatId: string): Observable<ActiveChat> {
    return this.chatsService.loadChatById(chatId).pipe(
      tap(chat => {
        this.activeChat = chat;
        this.messages$ = this.createMessages$();
      })
    );
  }

  private createMessages$(): Observable<MessageModel[]> {
    return combineLatest([
      this.userService.loadUser(this.activeChat!.authorUserId),
      this.userService.loadUser(this.activeChat!.targetUserId)
    ]).pipe(
      switchMap(([authorUser, targetUser]) => {
        const queryMessages = (ref: CollectionReference) => ref.orderBy('createdAt', 'asc');
        return this.firestore.collection<MessageJSON>(this.messagesPath, queryMessages).valueChanges({ idField: 'id' }).pipe(
          map(messages => messages.map(message => {
            const model = MessageModel.fromDocumentData(message);
            model.author = model.authorRef.id === authorUser.id ? authorUser : targetUser;
            model.isCurrentUserMessage = model.author.id === this.userService.currentUser?.id
            return model;
          }))
        );
      })
    );
  }

  send(text: string): Observable<void> {
    const message: MessageJSON = {
      authorRef: this.userService.currentUserRef,
      createdAt: new Date(),
      text
    };
    return from(this.firestore.collection(this.messagesPath).add(message)).pipe(respondWithVoid);
  }

  private get messagesPath(): string {
    return `chats/${this.activeChat!.id}/messages`;
  }
}
