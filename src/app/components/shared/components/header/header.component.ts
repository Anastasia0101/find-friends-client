import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import {UserService} from "../../../../modules/shared";
import {UserModel} from "../../../../modules/shared/models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private readonly userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  get user(): UserModel {
    return this.userService.currentUser!;
  }

  clickedBtnLogout(): void {
    this.userAuthService.deleteUserToken();
    void this.router.navigateByUrl('main');
  }
}
