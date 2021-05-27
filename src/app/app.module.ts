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
import { UserRegistrationService } from './services/user-registration.service';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { MainPageComponent } from './components/views/main-page/main-page.component';
import { HeaderComponent } from './components/shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    RegistrationPageComponent,
    EditProfilePageComponent,
    ProfilePageComponent,
    MainPageComponent,
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
    MatSelectModule
  ],
  providers: [
    UserAuthService,
    UserRegistrationService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
