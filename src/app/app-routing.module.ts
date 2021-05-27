import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { MainPageComponent } from './components/views/main-page/main-page.component';

const routes: Routes = [
  { path: 'auth-form', component: AuthFormComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'edit-profile', component: ProfilePageComponent },
  { path: 'main', component: MainPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
