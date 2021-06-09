import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

enum Steps {
  START,
  USER_DETAILS,
  WAIT_CONFIRMATION,
  INTERESTS
}

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  public currentStep: Steps = Steps.START;
  public readonly Steps = Steps;

  constructor(activatedRoute: ActivatedRoute) {
    const { progress } = activatedRoute.snapshot.queryParams;

    if (progress === 'email-verified') {
      this.openStep(Steps.USER_DETAILS);
    }
  }

  openStep(step: Steps): void {
    this.currentStep = step;
  }
}
