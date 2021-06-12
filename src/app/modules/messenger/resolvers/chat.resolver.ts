import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ChatModel} from "../models";
import {ChatService} from "../services";

@Injectable()
export class ChatResolver implements Resolve<ChatModel | null> {
  constructor(
    private chatService: ChatService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ChatModel | null> {
    return this.chatService.activateChat(route.params.id).pipe(
      switchMap((chat) => {
        if (chat) return of(chat);
        this.router.navigate(['/home/messenger'])
        return EMPTY;
      })
    );
  }
}
