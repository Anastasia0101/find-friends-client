import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../material/material.module";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./components";
import {LoginService} from "./services";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ]),
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class SigninModule {}
