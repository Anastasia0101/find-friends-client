import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  clickedBtnLogout(): void {
    this.userAuthService.deleteUserToken();
    void this.router.navigateByUrl('main');
  }
}
