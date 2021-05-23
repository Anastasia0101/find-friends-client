import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAuthFormValue } from 'src/app/models/user-auth-form-value.model';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {

  userAuthForm: FormGroup;

  isDataCorrect = true;

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService
  ) {
    this.userAuthForm = this.formBuilder.group({
      nickname: [
        'john', [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      password: [
        'changeme', [
          Validators.required
        ]
      ],
      isRememberUserData: [false]
    });
  }

  public onFormSubmit(): void {
    const formData = this.userAuthForm.value as UserAuthFormValue;
    if (formData.nickname && formData.password) {
      this.userAuthService.login(formData.nickname, formData.password).subscribe((data) => {
        console.log(data);
        if (!data) {
          this.isDataCorrect = false;
          console.log(data);
        }
      });
    }
  }
}
