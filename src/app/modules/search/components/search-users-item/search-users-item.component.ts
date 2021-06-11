import {Component, Input} from '@angular/core';
import {ChatsService} from "../../../../services/chats.service";
import {Router} from "@angular/router";
import {UserModel} from "../../../shared";

@Component({
  selector: 'app-search-users-item',
  templateUrl: './search-users-item.component.html',
  styleUrls: ['./search-users-item.component.css']
})
export class SearchUsersItemComponent {
  constructor(
    private chatService: ChatsService,
    private router: Router
  ) { }

  @Input() user!: UserModel;

  createChat(userId: string): void {
    this.chatService.createChat(userId).subscribe(({ chatId }) => {
      this.router.navigate(['/home/messenger', chatId])
    });
  }
}