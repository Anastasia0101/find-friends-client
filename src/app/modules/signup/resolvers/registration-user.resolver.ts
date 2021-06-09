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
    const { progress, id } = route.queryParams;
    if (progress !== 'email-verified') return of(null);
    return this.firestore.doc<UserJSON>(`users/${id}`).valueChanges().pipe(
      first(),
      map(user => {
        this.registrationService.user.id = id;
        Object.assign(this.registrationService.user, user);
        return null;
      })
    )
  }
}
