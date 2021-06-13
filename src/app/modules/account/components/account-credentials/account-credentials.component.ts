import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {AccountService} from "../../services";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../shared";

@Component({
  selector: 'app-account-credentials',
  templateUrl: './account-credentials.component.html',
  styleUrls: ['./account-credentials.component.css']
})
export class AccountCredentialsComponent {
  private initialEmail: string = this.userService.currentUser?.email || '';
  public readonly emailForm = this.formBuilder.group({
    email: [
      this.initialEmail, [
        Validators.required,
        Validators.email,
        Validators.min(6)
      ]
    ]
  });
  public readonly passwordForm = this.formBuilder.group({
    password: [
      '', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.minLength(4),
      ]
    ],
    confirmPassword: ['', this.validatePasswordConfirmation.bind(this)]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly userService: UserService,
    private readonly toastr: ToastrService
  ) {}

  private validatePasswordConfirmation(control: AbstractControl): ValidationErrors | null {
    return this.passwordForm?.value.password === control.value ? null : { mismatch: true };
  }

  updateEmail() {
    this.emailForm.markAllAsTouched();
    if (this.emailForm.invalid) return;
    this.accountService.updateEmail(this.emailForm.value.email).subscribe({
      next: () => this.toastr.success('Email updated'),
      error: this.onEmailError.bind(this)
    });
  }

  private onEmailError(error: Record<string, any>): void {
    if (error.code === 'auth/email-already-in-use') {
      this.emailForm.controls.email.setErrors({ alreadyUsed: true, message: error.message });
    }
  }

  updatePassword() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) return;
    this.accountService.updatePassword(this.passwordForm.value.password).subscribe(() => {
      this.toastr.success('Password updated')
    });
  }
}
