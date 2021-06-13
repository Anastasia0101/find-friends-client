import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {FavoritesService, UserModel} from "../../../shared";
import {ChatsService} from "../../../messenger/services";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-search-users-item',
  templateUrl: './search-users-item.component.html',
  styleUrls: ['./search-users-item.component.css']
})
export class SearchUsersItemComponent {
  constructor(
    private readonly chatService: ChatsService,
    private readonly favoritesService: FavoritesService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }

  @Input() user!: UserModel;

  createChat(): void {
    this.chatService.createChat(this.user.id).subscribe(({ chatId }) => {
      this.router.navigate(['/home/messenger', chatId])
    });
  }

  addToFavorites() {
    this.favoritesService.addUser(this.user.id).subscribe(() => {
      this.toastr.success('Added to Favorites')
    });
  }

  removeFromFavorites() {
    this.favoritesService.removeUser(this.user.id).subscribe(() => {
      this.toastr.success('Removed from Favorites')
    })
  }
}
