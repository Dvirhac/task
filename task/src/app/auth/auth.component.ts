import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthResponseData, AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  isLoginMode: boolean;
  isLoading = false;
  errorMessage: string = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    let authObs: Observable<AuthResponseData>;
    if (!this.loginForm.valid) { return; }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isLoading = true;

    if (this.isLoginMode)
    {
      authObs = this.authService.signIn(email, password);
    }
    else
    {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      authResponse => {
        console.log(authResponse);
        this.isLoading = false;
        this.router.navigate(['/trip-main']);
      }
      , errorResponse => {
        this.errorMessage = errorResponse;
        this.isLoading = false;
      }
    );
    this.loginForm.reset();
  }


  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
