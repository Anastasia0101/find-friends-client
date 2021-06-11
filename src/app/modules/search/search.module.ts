import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {SearchPageComponent, SearchUsersComponent, SearchUsersItemComponent} from "./components";
import {SharedModule} from "../shared";
import {MaterialModule} from "../../material/material.module";

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
  ]
})
export class SearchModule {}
