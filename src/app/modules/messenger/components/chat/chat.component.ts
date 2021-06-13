import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../services";
import {MessageModel} from "../../models";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messages: MessageModel[] = [];
  @ViewChild('messagesContainer')
  private messagesContainerRef!: ElementRef<HTMLElement>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly chatService: ChatService
  ) {}

  ngOnInit() {
    let messagesSubscription: Subscription;

    this.activatedRoute.params.subscribe(() => {
      messagesSubscription?.unsubscribe();
      messagesSubscription = this.chatService.messages$.subscribe(this.onMessagesUpdated.bind(this));
    });
  }

  private onMessagesUpdated(messages: MessageModel[]) {
    this.messages = messages;
    setTimeout(this.scrollToBottom.bind(this));
  }

  private scrollToBottom() {
    this.messagesContainerRef.nativeElement.scrollTop = this.messagesContainerRef.nativeElement.scrollHeight;
  }
}
