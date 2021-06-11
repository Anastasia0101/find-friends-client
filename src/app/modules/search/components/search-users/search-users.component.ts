import { Component } from '@angular/core';
import {UserSearchService} from "../../services/user-search.service";

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent {
  public readonly users$ = this.searchService.search();

  constructor(private searchService: UserSearchService) {}
}
