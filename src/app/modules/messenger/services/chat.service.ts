import {Injectable} from "@angular/core";
import {ChatModel} from "../models";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ChatsService} from "./chats.service";

type ActiveChat = ChatModel | null;

@Injectable()
export class ChatService {
  public activeChat: ActiveChat = null;

  constructor(private readonly chatsService: ChatsService) {}

  public activateChat(chatId: string): Observable<ActiveChat> {
    return this.chatsService.loadChatById(chatId).pipe(
      tap(chat => this.activeChat = chat)
    );
  }

  send(text: string) {

  }
}
