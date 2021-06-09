import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Chat } from "../modules/messenger/models/chat.model";
import { UserService } from "../modules/shared";

interface NewChat {
  chatId: string;
}

@Injectable()
export class ChatsService {

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) { }

  createChat(targetUserId: string): Observable<NewChat> {
    const data = {
      id: this.firestore.createId(),
      authorUserId: this.userService.currentUser!.id,
      targetUserId: targetUserId
    };

    return from(this.firestore.collection<Chat>('chats').add(data)).pipe(
      map(doc => ({ chatId: doc.id }))
    );
  }
}
