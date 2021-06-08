import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserRegistrationService} from "../../services";
import {FileUploadControl, FileUploadValidators} from "@iplab/ngx-file-upload";
import {switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Output()
  private readonly onComplete: EventEmitter<null> = new EventEmitter<null>();
  public readonly acceptedAvatarTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  public avatarControl = new FileUploadControl({ accept: this.acceptedAvatarTypes, multiple: false }, [
    FileUploadValidators.filesLimit(1),
    FileUploadValidators.accept(this.acceptedAvatarTypes),
    FileUploadValidators.fileSize(1024 * 5)
  ])
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
    private registrationService: UserRegistrationService
  ) {}

  public saveUserData() {
    this.detailsForm.markAllAsTouched();
    if (this.detailsForm.invalid) return;
    this.registrationService.addAvatar(this.avatarControl.value).pipe(
      tap(() => Object.assign(this.registrationService.user, this.detailsForm.value)),
      switchMap(() => this.registrationService.updateUser())
    ).subscribe(() => this.onComplete.next(null));
  }
}
