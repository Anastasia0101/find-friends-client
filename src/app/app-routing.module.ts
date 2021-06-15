import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthOnlyGuard, InauthOnlyGuard, CurrentUserResolver} from "./modules/shared";

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
        loadChildren: () => import(/* webpackChunkName: "signup" */ './modules/signup').then(m => m.SignupModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import(/* webpackChunkName: "signin" */ './modules/signin').then(m => m.SigninModule)
      }
    ]
  },
  {
    path: 'home',
    canActivate: [AuthOnlyGuard],
    resolve: { currentUser: CurrentUserResolver },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/search'
      },
      {
        path: 'account',
        loadChildren: () => import(/* webpackChunkName: "account" */ './modules/account').then(m => m.AccountModule)
      },
      {
        path: 'messenger',
        loadChildren: () => import(/* webpackChunkName: "messenger" */ './modules/messenger').then(m => m.MessengerModule)
      },
      {
        path: 'search',
        loadChildren: () => import(/* webpackChunkName: "search" */ './modules/search').then(m => m.SearchModule)
      },
      {
        path: 'users',
        loadChildren: () => import(/* webpackChunkName: "profile" */ './modules/profile').then(m => m.ProfileModule)
      }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/home/search'  },
  { path: '**', redirectTo: '/home/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
