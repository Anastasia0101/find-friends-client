import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ChatsService } from "src/app/services/chats.service";
import { Chat } from "../models/chat.model";

@Injectable()
export class ChatResolver implements Resolve<Chat> {
  constructor(
    private chatService: ChatsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Chat> {
    return this.chatService.loadChatById(route.params.id).pipe(
      switchMap((chat) => {
        if (chat) return of(chat);
        this.router.navigate(['/home/messenger'])
        return EMPTY;
      })
    );
  }
}
