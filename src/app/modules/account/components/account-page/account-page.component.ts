import {Component} from '@angular/core';
import {NavigationLinkModel} from "../../../../models";
import {ActivatedRoute, ChildActivationEnd, Router} from "@angular/router";
import {Observable} from "rxjs";
import {distinctUntilChanged, filter, map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  public readonly navigationLinks: NavigationLinkModel[] = [
    new NavigationLinkModel('Favorites', 'favorites'),
    new NavigationLinkModel('Credentials', 'credentials'),
    new NavigationLinkModel('Personal Info', 'details'),
    new NavigationLinkModel('Your Interests', 'interests')
  ];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  get title(): string {
    if (!this.activatedRoute.firstChild) return '';
    return this.activatedRoute.firstChild.snapshot.data.title || '';
  }
}
