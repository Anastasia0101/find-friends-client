import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AngularFirestore} from "@angular/fire/firestore";
import {first, map} from "rxjs/operators";
import {UserJSON} from "../../shared";
import {UserRegistrationService} from "../services";

@Injectable()
export class RegistrationUserResolver implements Resolve<null> {
  constructor(
    private readonly firestore: AngularFirestore,
    private readonly registrationService: UserRegistrationService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<null> {
    if (!route.queryParamMap.has('id')) return of(null);
    const userId = route.queryParamMap.get('id')!;

    return this.firestore.doc<UserJSON>(`users/${userId}`).valueChanges().pipe(
      first(),
      map(user => {
        this.registrationService.user.id = userId;
        Object.assign(this.registrationService.user, user);
        return null;
      })
    )
  }
}
