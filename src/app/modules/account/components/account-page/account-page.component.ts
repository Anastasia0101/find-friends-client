import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  registrationForm: FormGroup = this.formBuilder.group({
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

  constructor(private formBuilder: FormBuilder) {}

  saveUserData(): void {}
}
