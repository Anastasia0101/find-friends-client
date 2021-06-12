import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {Chat} from "../models/chat.model";
import {ChatService} from "../services/chat.service";

@Injectable()
export class ChatResolver implements Resolve<Chat | null> {
  constructor(
    private chatService: ChatService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Chat | null> {
    return this.chatService.activateChat(route.params.id).pipe(
      switchMap((chat) => {
        if (chat) return of(chat);
        this.router.navigate(['/home/messenger'])
        return EMPTY;
      })
    );
  }
}
