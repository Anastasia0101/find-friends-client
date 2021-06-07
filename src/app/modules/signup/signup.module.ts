import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { CredentialsComponent } from './components/credentials/credentials.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UserRegistrationService} from "./services";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CredentialsComponent }
    ]),
    AngularFireAuthModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [CredentialsComponent],
  providers: [
    UserRegistrationService
  ]
})
export class SignupModule {}
