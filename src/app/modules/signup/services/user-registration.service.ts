import { Injectable } from '@angular/core';
import {Observable, from, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {RegistrationUserModel} from '../models';
import firebase from "firebase";
import User = firebase.User;
import {respondWithVoid} from "../../../operators";
import {switchMap} from "rxjs/operators";

@Injectable()
export class UserRegistrationService {
  constructor(private readonly fireAuth: AngularFireAuth) {}

  addNewUser(userData: RegistrationUserModel): Observable<void> {
    return from(this.fireAuth.createUserWithEmailAndPassword(userData.email, userData.password)).pipe(
      switchMap(({ user }) => this.verifyUserEmail(user))
    )
  }

  private verifyUserEmail(user: User | null): Observable<void> {
    const verification$ = !user || user.emailVerified ? of() : from(user.sendEmailVerification());
    return verification$.pipe(respondWithVoid);
  }
}
