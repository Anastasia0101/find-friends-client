import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ChatService} from "../../services";

@Component({
  selector: 'app-chat-sender',
  templateUrl: './chat-sender.component.html',
  styleUrls: ['./chat-sender.component.css']
})
export class ChatSenderComponent {
  public readonly messageControl = new FormControl('');

  constructor(private readonly chatService: ChatService) {}

  send(event: Event) {
    event.preventDefault();
    const text = this.messageControl.value.trim();
    if (text) this.chatService.send(text);
    this.messageControl.reset('');
  }
}
