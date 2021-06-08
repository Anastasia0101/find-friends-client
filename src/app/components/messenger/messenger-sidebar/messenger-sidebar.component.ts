import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/messenger/chat.model';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-messenger-sidebar',
  templateUrl: './messenger-sidebar.component.html',
  styleUrls: ['./messenger-sidebar.component.css']
})
export class MessengerSidebarComponent implements OnInit {

  chats: Chat[] = [];

  constructor(private messengerService: MessengerService) { }

  ngOnInit(): void {
    this.getChats();
  }

  getChats(): void {
    this.messengerService.getChats().subscribe((data: Chat[]) => {
      this.chats = data;
      console.log(this.chats);
    });
  }

  onChooseChat(chat: Chat): void {
    console.log(chat);
  }
}
