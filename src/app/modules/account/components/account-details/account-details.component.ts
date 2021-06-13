import { Component } from '@angular/core';
import {FileUploadControl, FileUploadValidators} from "@iplab/ngx-file-upload";
import {FormBuilder, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {AccountService} from "../../services";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../shared";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  public readonly acceptedAvatarTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  public avatarControl = new FileUploadControl({ accept: this.acceptedAvatarTypes, multiple: false }, [
    FileUploadValidators.filesLimit(1),
    FileUploadValidators.accept(this.acceptedAvatarTypes),
    FileUploadValidators.fileSize(1024 * 5)
  ])
  public detailsForm = this.formBuilder.group({
    name: [
      this.userService.currentUser?.name || '', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[a-zA-Z]*')
      ]
    ],
    nickname: [
      this.userService.currentUser?.nickname || '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z0-9]*')
      ]
    ],
    dateOfBirth: [this.userService.currentUser?.dateOfBirth || '', Validators.required],
    country: [this.userService.currentUser?.country || '', Validators.required]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly userService: UserService,
    private readonly toastr: ToastrService
  ) {}

  public saveUserData() {
    this.detailsForm.markAllAsTouched();
    if (this.detailsForm.invalid) return;
    this.accountService.updateAvatar(this.avatarControl.value).pipe(
      switchMap(() => this.accountService.updateUser(this.detailsForm.value))
    ).subscribe(() => {
      this.avatarControl.clear();
      this.toastr.success('Updated');
    });
  }
}
