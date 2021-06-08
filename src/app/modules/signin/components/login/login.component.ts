import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from "../../services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userAuthForm = this.formBuilder.group({
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
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.minLength(4),
      ]
    ]
  });
  isDataCorrect = true;
  hide = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  public onFormSubmit(): void {
    this.userAuthForm.markAllAsTouched();
    if (this.userAuthForm.invalid) return;
    const { email, password } = this.userAuthForm.value;

    this.loginService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('find-friends'),
      error: () => this.isDataCorrect = false
    });
  }
}
