import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import { FindFriendsPageComponent } from './components/views/find-friends-page/find-friends-page.component';
import { MainPageComponent } from './components/views/main-page/main-page.component';
import { AuthGuardService } from './guards/auth-guard.service';
import {AuthOnlyGuard, InauthOnlyGuard} from "./modules/shared";

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [InauthOnlyGuard],
    children: [
      {
        path: '',
        redirectTo: '/auth/sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./modules/signup').then(m => m.SignupModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./modules/signin').then(m => m.SigninModule)
      }
    ]
  },
  {
    path: 'home',
    canActivate: [AuthOnlyGuard],
    component: FindFriendsPageComponent
  },
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
