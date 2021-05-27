import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationFormValue } from 'src/app/models/user-registration/registration-form-value.model';
import { User } from 'src/app/models/user.model';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {

  @Input() user!: User;

  nameOfUser = 'ann';

  registrationForm: FormGroup;

  id = 1;

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

  ngOnInit(): void {
    console.log(this.user);
    if (this.user) {
      this.updateFormValue();
    }
  }

  saveUserData(): void {
    const formData = this.registrationForm.value as RegistrationFormValue;
    this.userRegistrationService.addNewUser(formData).subscribe();
  }

  updateFormValue(): void {
    this.registrationForm.setValue({
      name: this.user.name,
      nickname: this.user.nickname,
      email: this.user.email,
      dateOfBirth: this.user.dateOfBirth,
      country: this.user.country,
      sentenceAboutUser: this.user.sentenceAboutUser
    });
  }
}
