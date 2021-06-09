import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatsService } from 'src/app/services/chats.service';
import { Chat } from '../models/chat.model';

@Injectable()
export class MessengerService {

  constructor(private readonly chatsService: ChatsService) { }

  getChats(): Observable<Chat[]> {
    return this.chatsService.loadChats();
  }
}
