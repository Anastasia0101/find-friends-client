import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user!: User;
  constructor(private userRegistrationService: UserRegistrationService) { }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(): void {
    this.userRegistrationService.getUserById(1).subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
    });
  }
}
