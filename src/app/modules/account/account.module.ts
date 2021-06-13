import {NgModule} from "@angular/core";
import {SharedModule} from "../shared";
import {RouterModule} from "@angular/router";
import { AccountPageComponent, AccountCredentialsComponent, AccountDetailsComponent } from './components';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AccountService} from "./services";
import {FileUploadModule} from "@iplab/ngx-file-upload";

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
          },
          {
            path: 'details',
            component: AccountDetailsComponent
          }
        ]
      }
    ]),
    SharedModule,
    FileUploadModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  declarations: [
    AccountPageComponent,
    AccountCredentialsComponent,
    AccountDetailsComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule {}
