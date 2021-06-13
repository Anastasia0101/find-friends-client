import {Component, Input, OnInit} from '@angular/core';
import {ChatModel, MessageModel} from "../../models";
import {ChatsService} from "../../services";
import {UserModel} from "../../../shared";

@Component({
  selector: 'app-messenger-sidebar-item',
  templateUrl: './messenger-sidebar-item.component.html',
  styleUrls: ['./messenger-sidebar-item.component.css']
})
export class MessengerSidebarItemComponent implements OnInit {
  @Input()
  public chat!: ChatModel;
  public lastMessage: MessageModel | null = null;

  constructor(private readonly chatsService: ChatsService) { }

  ngOnInit(): void {
    this.chatsService.loadLastMessage(this.chat).subscribe(message => this.lastMessage = message);
  }

  public get receiver(): UserModel {
    return this.chat.receiver!;
  }
}
