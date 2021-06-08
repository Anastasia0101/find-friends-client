import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../material/material.module";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {UserService} from "./services";
import {AuthOnlyGuard, InauthOnlyGuard} from "./guards";
import {AngularFirestoreModule} from "@angular/fire/firestore";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    UserService,
    AuthOnlyGuard,
    InauthOnlyGuard
  ],
  exports: [
    MaterialModule,
    AngularFirestoreModule
  ]
})
export class SharedModule {}
