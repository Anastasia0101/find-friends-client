import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../material/material.module";
import {RouterModule} from "@angular/router";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {ReactiveFormsModule} from "@angular/forms";
import { ChatComponent } from "./chat/chat.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  declarations: [

  ],
  providers: [

  ]
})
export class MessengerModule {}
