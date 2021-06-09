import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ChatsService } from 'src/app/services/chats.service';

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

  @Input() user!: User;

  createChat(userId: string): void {
    console.log(this.user.id);
    this.chatService.createChat(userId).subscribe(({ chatId }) => {
      this.router.navigate(['/home/messenger', chatId])
    });
  }
}
