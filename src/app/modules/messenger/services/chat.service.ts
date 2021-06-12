import {Injectable} from "@angular/core";
import {Chat} from "../models/chat.model";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {ChatsService} from "../../../services/chats.service";

type ActiveChat = Chat | null;

@Injectable()
export class ChatService {
  public activeChat: ActiveChat = null;

  constructor(private readonly chatsService: ChatsService) {}

  public activateChat(chatId: string): Observable<ActiveChat> {
    return this.chatsService.loadChatById(chatId).pipe(
      tap(chat => this.activeChat = chat)
    );
  }
}
