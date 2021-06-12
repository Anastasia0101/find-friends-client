import { Component } from '@angular/core';
import {ChatsService} from "../../services";

@Component({
  selector: 'app-messenger-sidebar',
  templateUrl: './messenger-sidebar.component.html',
  styleUrls: ['./messenger-sidebar.component.css']
})
export class MessengerSidebarComponent {
  chats$ = this.chatsService.loadChats();

  constructor(private readonly chatsService: ChatsService) { }
}
