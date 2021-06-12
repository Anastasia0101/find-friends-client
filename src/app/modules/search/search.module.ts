import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {SearchPageComponent, SearchUsersComponent, SearchUsersItemComponent} from "./components";
import {SharedModule, MaterialModule} from "../shared";
import {UserSearchService} from "./services";
import {ChatsService} from "../messenger/services";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchPageComponent
      }
    ]),
    MaterialModule,
    SharedModule,
    AngularFirestoreModule
  ],
  declarations: [
    SearchPageComponent,
    SearchUsersComponent,
    SearchUsersItemComponent
  ],
  providers: [
    UserSearchService,
    ChatsService
  ]
})
export class SearchModule {}
