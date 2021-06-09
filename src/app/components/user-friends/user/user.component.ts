import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChatsService } from 'src/app/services/chats.service';
import {UserModel} from "../../../modules/shared";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

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
