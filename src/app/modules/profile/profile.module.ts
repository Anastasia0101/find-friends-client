import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { ProfilePageComponent } from './components';
import {SharedModule} from "../shared";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {UserResolver} from "./resolvers";
import {AgePipe} from "./pipes";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        resolve: { user: UserResolver },
        component: ProfilePageComponent
      }
    ]),
    SharedModule,
    AngularFirestoreModule
  ],
  declarations: [
    ProfilePageComponent,
    AgePipe
  ],
  providers: [UserResolver]
})
export class ProfileModule {}
