import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { CredentialsComponent, SignupPageComponent, WaitConfirmationComponent, UserDetailsComponent } from './components';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UserRegistrationService} from "./services";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {FileUploadModule} from "@iplab/ngx-file-upload";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {RegistrationUserResolver} from "./resolvers";

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
    FileUploadModule
  ],
  declarations: [
    CredentialsComponent,
    SignupPageComponent,
    WaitConfirmationComponent,
    UserDetailsComponent
  ],
  providers: [
    UserRegistrationService,
    RegistrationUserResolver
  ]
})
export class SignupModule {}
