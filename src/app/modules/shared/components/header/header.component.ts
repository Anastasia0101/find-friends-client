import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services";
import {NavigationLinkModel} from "../../../../models";
import {UserModel} from "../../models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public user: UserModel | null;
  public readonly navigationLinks: NavigationLinkModel[] = [
    new NavigationLinkModel('Account', '/home/account'),
    new NavigationLinkModel('Chats', '/home/messenger'),
    new NavigationLinkModel('Search', '/home/search')
  ];

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.user = this.userService.currentUser;
    this.userService.currentUser$.subscribe(user => this.user = user);
  }

  clickedBtnLogout(): void {
    this.userService.signOut();
    void this.router.navigateByUrl('auth');
  }
}
