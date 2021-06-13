import {NgModule} from "@angular/core";
import {SharedModule} from "../shared";
import {RouterModule} from "@angular/router";
import { AccountPageComponent, AccountCredentialsComponent } from './components';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AccountService} from "./services";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountPageComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'credentials'
          },
          {
            path: 'credentials',
            component: AccountCredentialsComponent
          }
        ]
      }
    ]),
    SharedModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  declarations: [
    AccountPageComponent,
    AccountCredentialsComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule {}
