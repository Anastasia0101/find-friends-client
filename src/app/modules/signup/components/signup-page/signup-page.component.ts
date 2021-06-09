import { Component } from '@angular/core';
import {UserRegistrationService} from "../../services";
import {RegistrationProgress} from "../../../shared/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  public currentStep: RegistrationProgress;
  public readonly Steps = RegistrationProgress;

  constructor(
    private readonly registrationService: UserRegistrationService,
    private readonly router: Router
  ) {
    this.currentStep = this.registrationService.user.progress;
  }

  openStep(step: RegistrationProgress): void {
    this.currentStep = step;
  }

  complete(): void {
    this.router.navigate(['/home']);
  }
}
