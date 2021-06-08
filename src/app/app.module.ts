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
import { AuthGuardService } from './guards/auth-guard.service';
import { FindFriendsPageComponent } from './components/views/find-friends-page/find-friends-page.component';
import { UsersListComponent } from './components/user-friends/users-list/users-list.component';
import { UserComponent } from './components/user-friends/user/user.component';
import { UserService } from './services/users.service';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { MaterialModule } from './material/material.module';
import { ChatComponent } from './components/messenger/chat/chat.component';
import { UserDialogComponent } from './components/user-friends/user-dialog/user-dialog.component';
import { MessengerPageComponent } from './components/views/messenger-page/messenger-page.component';
import { MessengerSidebarComponent } from './components/messenger/messenger-sidebar/messenger-sidebar.component';
import { MessengerService } from './services/messenger.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    EditProfilePageComponent,
    MainPageComponent,
    FindFriendsPageComponent,
    UsersListComponent,
    UserComponent,
    HeaderComponent,
    ChatComponent,
    UserDialogComponent,
    MessengerPageComponent,
    MessengerSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    UserAuthService,
    UserRegistrationService,
    MaterialModule,
    AuthGuardService,
    UserService,
    MessengerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
