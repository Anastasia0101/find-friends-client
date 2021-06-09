import { Injectable } from '@angular/core';
import {Observable, from, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {RegistrationUserModel} from '../models';
import firebase from "firebase";
import User = firebase.User;
import {respondWithVoid} from "../../../operators";
import {first, last, map, switchMap, tap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {UserJSON} from "../../shared";

@Injectable()
export class UserRegistrationService {
  public user: RegistrationUserModel = new RegistrationUserModel();

  constructor(
    private readonly fireAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
    private readonly fireStorage: AngularFireStorage
  ) {}

  addNewUser(): Observable<void> {
    return from(this.fireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password)).pipe(
      switchMap(({ user }) => this.createUser(user!)),
      switchMap(this.verifyUserEmail.bind(this))
    )
  }

  private createUser(firebaseUser: User): Observable<User> {
    const data: Partial<UserJSON> = {
      authId: firebaseUser.uid,
      email: this.user.email,
      isRegistrationFinished: this.user.isRegistrationFinished
    };
    return from(this.firestore.collection('users').add(data)).pipe(
      tap(doc => this.user.id = doc.id),
      map(() => firebaseUser)
    );
  }

  private verifyUserEmail(user: User): Observable<void> {
    const params = { url: `${window.origin}/auth/sign-up?progress=email-verified&id=${this.user.id}` };
    const verification$ = !user || user.emailVerified ? of() : from(user.sendEmailVerification(params));
    return verification$.pipe(respondWithVoid);
  }

  public addAvatar([file]: File[]): Observable<void> {
    if (!file) return of(void 0);
    const task = this.fireStorage.upload(`users/${this.user.id}/${Date.now()}.${file.name}`, file)
    return task.snapshotChanges().pipe(
      last(),
      switchMap(snapshot => from(snapshot!.ref.getDownloadURL() as Promise<string>)),
      tap(url => this.user.avatarUrl = url),
      respondWithVoid
    );
  }

  public updateUser(): Observable<void> {
    const data: Partial<RegistrationUserModel> = { ...this.user };
    delete data.password;
    return from(this.firestore.doc<UserJSON>(`users/${this.user.id}`).update(data));
  }
}
