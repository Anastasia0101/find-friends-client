import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {ReactiveFormsModule} from "@angular/forms";
import { ChatComponent, MessengerSidebarComponent, MessengerPageComponent, ChatSenderComponent} from "./components";
import { SharedModule, MaterialModule } from "../shared";
import { ChatResolver } from "./resolvers";
import {ChatService, ChatsService} from "./services";

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
            chat: ChatResolver
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
    MessengerPageComponent,
    ChatSenderComponent
  ],
  providers: [
    ChatResolver,
    ChatService,
    ChatsService
  ],
  exports: [
    MessengerSidebarComponent
  ]
})
export class MessengerModule {}
