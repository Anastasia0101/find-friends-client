import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user$ = this.userService.currentUser$;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  clickedBtnLogout(): void {
    this.userService.signOut();
    void this.router.navigateByUrl('auth');
  }
}
