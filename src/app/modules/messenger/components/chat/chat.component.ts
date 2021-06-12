import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services";
import {MessageModel} from "../../models";
import {ActivatedRoute} from "@angular/router";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messages: MessageModel[] = [];
  private readonly destroy$: Subject<null> = new Subject<null>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly chatService: ChatService
  ) {}

  ngOnInit() {
    let messagesSubscription: Subscription;

    this.activatedRoute.params.subscribe(() => {
      messagesSubscription?.unsubscribe();
      messagesSubscription = this.chatService.messages$.subscribe(messages => this.messages = messages);
    });
  }
}
