import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/users.service';

@Pipe({
  name: 'userAuthData',
})
export class UserAuthPipe implements PipeTransform {

  constructor(private userService: UserService) { }

  transform(userId: number) {
    return this.userService.getUserById(userId).subscribe(user => user);
  }
}
