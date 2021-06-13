import { Component } from '@angular/core';
import {UserModel} from "../../../shared";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  public user$: Observable<UserModel> = this.createUserStream();

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  private createUserStream(): Observable<UserModel> {
    return this.activatedRoute.data.pipe(
      map(data => data.user)
    );
  }
}
