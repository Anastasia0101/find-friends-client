import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FavoritesService, UserModel} from "../../../shared";
import {ChatsService} from "../../../messenger/services";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-favorite-users-item',
  templateUrl: './favorite-users-item.component.html',
  styleUrls: ['./favorite-users-item.component.css']
})
export class FavoriteUsersItemComponent {
  constructor(
    private readonly chatService: ChatsService,
    private readonly favoritesService: FavoritesService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }

  @Input()
  public user!: UserModel;

  @Output()
  private onRemoved: EventEmitter<null> = new EventEmitter<null>();

  createChat(userId: string): void {
    this.chatService.createChat(userId).subscribe(({ chatId }) => {
      this.router.navigate(['/home/messenger', chatId])
    });
  }

  removeFromFavorites() {
    this.favoritesService.removeUser(this.user.id).subscribe(() => {
      this.toastr.success('Removed from Favorites')
      this.onRemoved.emit();
    })
  }
}
