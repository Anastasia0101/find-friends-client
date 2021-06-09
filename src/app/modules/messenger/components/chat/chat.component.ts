import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  public chatId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      console.log(data);
    });
  }
}
