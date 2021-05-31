import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAuthService } from './services/user-auth.service';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { UserRegistrationService } from './services/user-registration.service';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import { MainPageComponent } from './components/views/main-page/main-page.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { FindFriendsPageComponent } from './components/views/find-friends-page/find-friends-page.component';
import { UsersListComponent } from './components/user-friends/users-list/users-list.component';
import { UserComponent } from './components/user-friends/user/user.component';
import { UserService } from './services/users.service';
import { HeaderComponent } from './components/shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    RegistrationPageComponent,
    EditProfilePageComponent,
    MainPageComponent,
    FindFriendsPageComponent,
    UsersListComponent,
    UserComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [
    UserAuthService,
    UserRegistrationService,
    MatDatepickerModule,
    AuthGuardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
