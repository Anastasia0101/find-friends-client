import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import { FindFriendsPageComponent } from './components/views/find-friends-page/find-friends-page.component';
import { MainPageComponent } from './components/views/main-page/main-page.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: '/auth/signup',
        pathMatch: 'full'
      },
      {
        path: 'signup',
        loadChildren: () => import('./modules/signup').then(m => m.SignupModule)
      },
    ]
  },
  { path: 'auth-form', component: AuthFormComponent },
  { path: 'edit-profile', component: EditProfilePageComponent },
  { path: 'find-friends', component: FindFriendsPageComponent, canActivate: [AuthGuardService] },
  { path: '', component: MainPageComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
