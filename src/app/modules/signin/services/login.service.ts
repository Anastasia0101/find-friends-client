import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {respondWithVoid} from "../../../operators";

@Injectable()
export class LoginService {
  constructor(private readonly fireAuth: AngularFireAuth) {}

  login(email: string, password: string): Observable<void> {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(respondWithVoid);
  }
}
