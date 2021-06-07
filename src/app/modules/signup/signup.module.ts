import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { CredentialsComponent } from './components/credentials/credentials.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UserRegistrationService} from "./services";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { WaitConfirmationComponent } from './components/wait-confirmation/wait-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SignupPageComponent }
    ]),
    AngularFireAuthModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    CredentialsComponent,
    SignupPageComponent,
    WaitConfirmationComponent
  ],
  providers: [
    UserRegistrationService
  ]
})
export class SignupModule {}
