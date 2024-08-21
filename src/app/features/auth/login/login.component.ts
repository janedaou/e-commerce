import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { loginRequest } from './models/loginRequest';
import { loginResponse } from './models/loginResponse'; // Import the interface

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: loginRequest = {
        Username: this.loginForm.value.email,
        Password: this.loginForm.value.password
      };

      this.loginService.login(loginData).subscribe(
        (response: loginResponse) => {
          console.log('Login successful', response);
          // Store token or handle success response
          localStorage.setItem('token', response.token); // Use the token from the response

          // Redirect to the original product URL or the products page
          const redirectUrl = localStorage.getItem('redirectUrl');
          if (redirectUrl) {
            this.router.navigateByUrl(redirectUrl);
            localStorage.removeItem('redirectUrl'); // Clear after use
          } else {
            this.router.navigate(['/products']);
          }
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      );
    }
  }
}
