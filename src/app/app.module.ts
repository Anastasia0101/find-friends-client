import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { UserAuthService } from './services/user-auth.service';
import { UserRegistrationService } from './services/user-registration.service';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import { MainPageComponent } from './components/views/main-page/main-page.component';
import { FindFriendsPageComponent } from './components/views/find-friends-page/find-friends-page.component';
import { UsersListComponent } from './components/user-friends/users-list/users-list.component';
import { UserComponent } from './components/user-friends/user/user.component';
import { UsersService } from './services/users.service';
import {SharedModule} from "./modules/shared";
import { ChatsService } from './services/chats.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    EditProfilePageComponent,
    MainPageComponent,
    FindFriendsPageComponent,
    UsersListComponent,
    UserComponent,
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
    UserAuthService,
    UserRegistrationService,
    UsersService,
    ChatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
