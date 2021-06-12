import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services";

interface NavigationLink {
  title: string;
  href: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public readonly user$ = this.userService.currentUser$;
  public readonly navigationLinks: NavigationLink[] = [
    { title: 'Account', href: '/account' },
    { title: 'Chats', href: '/home/messenger' },
    { title: 'Search', href: '/home/search' }
  ];

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  clickedBtnLogout(): void {
    this.userService.signOut();
    void this.router.navigateByUrl('auth');
  }
}
