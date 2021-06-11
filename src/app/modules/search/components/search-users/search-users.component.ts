import { Component } from '@angular/core';
import {UsersService} from "../../../../services/users.service";

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent {
  public readonly users$ = this.userService.getUsers();

  constructor(private userService: UsersService) {}
}
