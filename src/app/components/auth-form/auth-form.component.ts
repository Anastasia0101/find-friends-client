import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {

  userAuthForm: FormGroup;

  hide = true;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.userAuthForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required],
      isRememberUserData: [false]
    });
  }

  public onFormSubmit(): void {

  }
}
