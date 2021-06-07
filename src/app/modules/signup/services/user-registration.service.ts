import { Injectable } from '@angular/core';
import {Observable, from, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {RegistrationUserModel} from '../models';
import firebase from "firebase";
import User = firebase.User;
import {respondWithVoid} from "../../../operators";
import {map, switchMap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable()
export class UserRegistrationService {
  constructor(
    private readonly fireAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) {}

  addNewUser(userData: RegistrationUserModel): Observable<void> {
    return from(this.fireAuth.createUserWithEmailAndPassword(userData.email, userData.password)).pipe(
      switchMap(({ user }) => this.storeUser(userData, user!)),
      switchMap(this.verifyUserEmail.bind(this))
    )
  }

  private storeUser(userData: RegistrationUserModel, firebaseUser: User): Observable<User> {
    const data: Record<string, any> = {authId: firebaseUser.uid, ...userData};
    delete data.password;
    return from(this.firestore.collection('users').add(data)).pipe(map(() => firebaseUser));
  }

  private verifyUserEmail(user: User): Observable<void> {
    const params = { url: `${window.origin}/auth/sign-up?progress=email-verified&auth-id=${user.uid}` };
    const verification$ = !user || user.emailVerified ? of() : from(user.sendEmailVerification(params));
    return verification$.pipe(respondWithVoid);
  }
}
