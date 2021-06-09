import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {UserRegistrationService} from '../../services';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent {
  @Output()
  private readonly onComplete: EventEmitter<null> = new EventEmitter<null>();

  public registrationForm = this.formBuilder.group({
    email: [
      '', [
        Validators.required,
        Validators.email,
        Validators.min(6)
      ]
    ],
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
    private formBuilder: FormBuilder,
    private registrationService: UserRegistrationService
  ) {}

  public saveUserData(): void {
    this.registrationService.user.email = this.registrationForm.value.email;
    this.registrationService.user.password = this.registrationForm.value.password;
    this.registrationService.addNewUser().subscribe({
      next: () => this.onComplete.next(),
      error: this.onError.bind(this)
    });
  }

  private validatePasswordConfirmation(control: AbstractControl): ValidationErrors | null {
    return this.registrationForm?.value.password === control.value ? null : { mismatch: true };
  }

  public getError(control: string): ValidationErrors | null {
    return this.registrationForm.get(control)?.errors ?? null;
  }

  private onError(error: Record<string, any>): void {
    if (error.code === 'auth/email-already-in-use') {
      this.registrationForm.get('email')?.setErrors({ alreadyUsed: true, message: error.message });
    }
  }
}
