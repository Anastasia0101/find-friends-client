import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {UserService} from "./services";
import {AuthOnlyGuard, InauthOnlyGuard} from "./guards";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { HeaderComponent } from "./components/header/header.component";
import { RouterModule } from "@angular/router";
import {MaterialModule} from "./material.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
  ],
  providers: [
    UserService,
    AuthOnlyGuard,
    InauthOnlyGuard
  ],
  exports: [
    MaterialModule,
    AngularFirestoreModule,
    HeaderComponent
  ]
})
export class SharedModule {}
