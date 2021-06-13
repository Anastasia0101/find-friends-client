import { Component } from '@angular/core';
import {ChatsService} from "../../services";
import {ChatModel, MessageModel} from "../../models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-messenger-sidebar',
  templateUrl: './messenger-sidebar.component.html',
  styleUrls: ['./messenger-sidebar.component.css']
})
export class MessengerSidebarComponent {
  chats$ = this.chatsService.loadChats();

  constructor(private readonly chatsService: ChatsService) { }

  loadLastMessage(chat: ChatModel): Observable<MessageModel | null> {
    return this.chatsService.loadLastMessage(chat);
  }
}
