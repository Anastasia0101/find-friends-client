import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { CredentialsComponent, SignupPageComponent, WaitConfirmationComponent } from './components';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UserRegistrationService} from "./services";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";

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
