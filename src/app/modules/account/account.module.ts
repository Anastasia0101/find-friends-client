import {NgModule} from "@angular/core";
import {SharedModule} from "../shared";
import {RouterModule} from "@angular/router";
import { AccountPageComponent } from './components';
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountPageComponent
      }
    ]),
    SharedModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  declarations: [AccountPageComponent]
})
export class AccountModule {}
