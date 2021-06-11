import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { UserRegistrationService } from './services/user-registration.service';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import {SharedModule} from "./modules/shared";
import { ChatsService } from './services/chats.service';

@NgModule({
  declarations: [
    AppComponent,
    EditProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    UserRegistrationService,
    ChatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
