import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserRegistrationService} from "../../services";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Output()
  private readonly onComplete: EventEmitter<null> = new EventEmitter<null>();

  public detailsForm = this.formBuilder.group({
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
    dateOfBirth: ['', Validators.required],
    country: ['', Validators.required],
    sentenceAboutUser: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService
  ) {}

  public saveUserData() {

  }
}
