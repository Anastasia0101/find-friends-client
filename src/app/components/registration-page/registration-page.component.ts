import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationFormValue } from 'src/app/models/user-registration/registration-form-value.model';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {

  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService
  ) {
    this.registrationForm = this.formBuilder.group({
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
          Validators.email,
          Validators.min(6)
        ]
      ],
      dateOfBirth: ['', Validators.required],
      country: ['', Validators.required],
      sentenceAboutUser: ['', Validators.required]
    });
  }

  saveUserData(): void {
    const formData = this.registrationForm.value as RegistrationFormValue;
    this.userRegistrationService.addNewUser(formData).subscribe();
  }
}
