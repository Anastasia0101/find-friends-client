import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MessageNotification, MessengerNotificationService} from "./modules/shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly messengerNotificationService: MessengerNotificationService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.messengerNotificationService.notifications$.subscribe(this.showNotification.bind(this));
  }

  private showNotification({ message, chatId }: MessageNotification): void {
    this.toastr.info(message.text, message.author!.nickname ).onTap.subscribe(() => {
      this.router.navigate(['/home/messenger', chatId]);
    });
  }
}
