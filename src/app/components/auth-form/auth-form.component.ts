import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private userAuthService: UserAuthService,
    private router: Router
  ) {
    this.userAuthForm = this.formBuilder.group({
      nickname: [
        '', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z0-9]*')
        ]
      ],
      password: [
        '', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]*'),
          Validators.minLength(4),
        ]
      ]
    });
  }

  public onFormSubmit(): void {
    const formData = this.userAuthForm.value as UserAuthFormValue;
    if (formData.nickname && formData.password) {
      this.userAuthService.login(formData.nickname, formData.password).subscribe();
      this.router.navigateByUrl('/find-friends');
    }
  }
}
