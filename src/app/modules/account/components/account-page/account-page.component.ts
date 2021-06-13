import {Component} from '@angular/core';
import {NavigationLinkModel} from "../../../../models";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  public readonly navigationLinks: NavigationLinkModel[] = [
    new NavigationLinkModel('Credentials', 'credentials'),
    new NavigationLinkModel('Personal Info', 'details')
  ];
}
