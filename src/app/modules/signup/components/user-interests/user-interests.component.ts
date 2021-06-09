import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserRegistrationService} from "../../services";
import {RegistrationProgress} from "../../../shared/models";

@Component({
  selector: 'app-user-interests',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.css']
})
export class UserInterestsComponent {
  @Output()
  private readonly onComplete: EventEmitter<null> = new EventEmitter<null>();

  public interests: Set<string> = new Set<string>();
  public interestsForm = this.formBuilder.group({
    sentenceAboutUser: ['', Validators.required],
    interest: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: UserRegistrationService
  ) {}

  addInterest(): void {
    const interestControl = this.interestsForm.controls.interest;
    this.interests.add(interestControl.value);
    interestControl.reset();
  }

  removeInterest(theme: string): void {
    this.interests.delete(theme);
  }

  public saveUserData() {
    this.interestsForm.markAllAsTouched();
    if (this.interestsForm.invalid) return;
    this.registrationService.user.progress = RegistrationProgress.COMPLETED;
    this.registrationService.user.sentenceAboutUser = this.interestsForm.value.sentenceAboutUser;
    this.registrationService.user.interests = Array.from(this.interests);
    this.registrationService.updateUser().subscribe(() => this.onComplete.next(null));
  }
}
