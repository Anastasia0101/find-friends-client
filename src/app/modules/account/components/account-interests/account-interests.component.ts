import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../shared";
import {AccountService} from "../../services";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-account-interests',
  templateUrl: './account-interests.component.html',
  styleUrls: ['./account-interests.component.css']
})
export class AccountInterestsComponent {
  public interests: Set<string> = this.getInitialInterests();
  public interestsForm = this.formBuilder.group({
    sentenceAboutUser: [
      this.userService.currentUser?.sentenceAboutUser || '',
      Validators.required
    ],
    interest: ['']
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly accountService: AccountService,
    private readonly toastr: ToastrService
  ) {}

  private getInitialInterests(): Set<string> {
    if (!this.userService.currentUser) return new Set<string>();
    return new Set(this.userService.currentUser.interests.map(interest => interest.name));
  }

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
    this.accountService.updateUser({
      sentenceAboutUser: this.interestsForm.value.sentenceAboutUser,
      interests: Array.from(this.interests)
    }).subscribe(() => this.toastr.success('Updated'));
  }
}
