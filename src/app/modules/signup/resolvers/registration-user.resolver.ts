import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AngularFirestore} from "@angular/fire/firestore";
import {first, map, switchMap} from "rxjs/operators";
import {UserRegistrationService} from "../services";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import CollectionReference = firebase.firestore.CollectionReference;

@Injectable()
export class RegistrationUserResolver implements Resolve<null> {
  constructor(
    private readonly firestore: AngularFirestore,
    private readonly fireAuth: AngularFireAuth,
    private readonly registrationService: UserRegistrationService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<null> {
    return this.fireAuth.user.pipe(
      first(),
      switchMap(user => {
        if (!user) return of(null);
        const queryAuthUser = (ref: CollectionReference) => ref.where('authId', '==', user.uid);
        return this.firestore.collection('users', queryAuthUser).get().pipe(
          map((query) => {
            const user = query.docs[0];
            this.registrationService.user.id = user.id;
            Object.assign(this.registrationService.user, user.data());
            return null;
          })
        )
      })
    );
  }
}
