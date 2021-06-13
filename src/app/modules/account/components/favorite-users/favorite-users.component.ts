import { Component } from '@angular/core';
import {FavoritesService, UserModel} from "../../../shared";
import {Observable} from "rxjs";

@Component({
  selector: 'app-favorite-users',
  templateUrl: './favorite-users.component.html',
  styleUrls: ['./favorite-users.component.css']
})
export class FavoriteUsersComponent {
  public users$!: Observable<UserModel[]>;

  constructor(private readonly favoritesService: FavoritesService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.favoritesService.loadUsers()
  }
}
