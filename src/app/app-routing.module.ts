import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
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
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/search'
      },
      {
        path: 'search',
        loadChildren: () => import('./modules/search').then(m => m.SearchModule)
      },
      {
        path: 'messenger',
        loadChildren: () => import('./modules/messenger').then(m => m.MessengerModule)
      },
    ]
  },
  { path: 'edit-profile', component: EditProfilePageComponent },
  { path: '**', redirectTo: '/home/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
