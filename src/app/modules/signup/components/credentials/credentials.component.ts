import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {UserRegistrationService} from '../../services';
import {RegistrationUserModel} from "../../models";

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent {
  @Output()
  private readonly onComplete: EventEmitter<null> = new EventEmitter<null>();

  public registrationForm = this.formBuilder.group({
    name: [
      '', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[a-zA-Z]*')
      ]
    ],
    nickname: [
      '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z0-9]*')
      ]
    ],
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
        Validators.min(6)
      ]
    ],
    dateOfBirth: ['', Validators.required],
    country: ['', Validators.required],
    sentenceAboutUser: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService
  ) {}

  public saveUserData(): void {
    const userData = new RegistrationUserModel(
      this.registrationForm.value.name,
      this.registrationForm.value.nickname,
      this.registrationForm.value.email,
      this.registrationForm.value.password,
      this.registrationForm.value.dateOfBirth,
      this.registrationForm.value.country,
      this.registrationForm.value.sentenceAboutUser
    );
    this.userRegistrationService.addNewUser(userData)
      .subscribe({
        next: () => this.onComplete.next(),
        error: this.onError.bind(this)
      });
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
