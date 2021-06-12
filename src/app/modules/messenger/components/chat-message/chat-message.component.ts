import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from "../../models";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  @Input()
  public message!: MessageModel;
}
