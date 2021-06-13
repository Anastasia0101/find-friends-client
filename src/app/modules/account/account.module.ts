import {NgModule} from "@angular/core";
import {SharedModule} from "../shared";
import {RouterModule} from "@angular/router";
import {
  AccountPageComponent,
  AccountCredentialsComponent,
  AccountDetailsComponent,
  AccountInterestsComponent,
  FavoriteUsersComponent,
  FavoriteUsersItemComponent
} from './components';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AccountService} from "./services";
import {FileUploadModule} from "@iplab/ngx-file-upload";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {ChatsService} from "../messenger/services";

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
            redirectTo: 'favorites'
          },
          {
            path: 'favorites',
            component: FavoriteUsersComponent,
            data: { title: 'FAVORITE USERS' }
          },
          {
            path: 'credentials',
            component: AccountCredentialsComponent,
            data: { title: 'EDIT CREDENTIALS' }
          },
          {
            path: 'details',
            component: AccountDetailsComponent,
            data: { title: 'EDIT PERSONAL INFO' }
          },
          {
            path: 'interests',
            component: AccountInterestsComponent,
            data: { title: 'EDIT YOUR INTERESTS' }
          }
        ]
      }
    ]),
    SharedModule,
    FileUploadModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatChipsModule,
    MatButtonModule
  ],
  declarations: [
    AccountPageComponent,
    AccountCredentialsComponent,
    AccountDetailsComponent,
    AccountInterestsComponent,
    FavoriteUsersComponent,
    FavoriteUsersItemComponent
  ],
  providers: [
    AccountService,
    ChatsService
  ]
})
export class AccountModule {}
