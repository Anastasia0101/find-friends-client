import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../material/material.module";
import {RouterModule} from "@angular/router";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {ReactiveFormsModule} from "@angular/forms";
import { ChatComponent } from "./components/chat/chat.component";
import { MessengerService } from "./services/messenger.service";
import { MessengerSidebarComponent } from "./components/messenger-sidebar/messenger-sidebar.component";
import { SharedModule } from "../shared";
import { ChatResolver } from "./resolvers/chat.resolver";
import {MessengerPageComponent} from "./components/messenger-page/messenger-page.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: MessengerPageComponent,
      children: [
        {
          path: ':id',
          component: ChatComponent,
          resolve: {
            // chat: ChatResolver
          }
        },
      ]
    },
    ]),
    SharedModule
  ],
  declarations: [
    ChatComponent,
    MessengerSidebarComponent,
    MessengerPageComponent
  ],
  providers: [
    MessengerService,
    ChatResolver
  ],
  exports: [
    MessengerSidebarComponent
  ]
})
export class MessengerModule {}
