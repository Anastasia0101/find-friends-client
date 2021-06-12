import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { CredentialsComponent, SignupPageComponent, WaitConfirmationComponent, UserDetailsComponent, UserInterestsComponent } from './components';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UserRegistrationService} from "./services";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "@iplab/ngx-file-upload";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {RegistrationUserResolver} from "./resolvers";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "../shared";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignupPageComponent,
        resolve: { user: RegistrationUserResolver }
      }
    ]),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    MaterialModule,
    FileUploadModule,
    MatChipsModule,
    MatButtonModule
  ],
  declarations: [
    CredentialsComponent,
    SignupPageComponent,
    WaitConfirmationComponent,
    UserDetailsComponent,
    UserInterestsComponent
  ],
  providers: [
    UserRegistrationService,
    RegistrationUserResolver
  ]
})
export class SignupModule {}
