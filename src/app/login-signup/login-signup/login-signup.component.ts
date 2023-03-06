import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {
  loginForm: FormGroup;
  signedUpUsers: any = [];

  constructor(private formBuilder: FormBuilder, private router : Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    //This code checks if the user is already signed up, if already signed up then he will be logged in directely.
    //If not signed up then his details will be stored in local storage and then he will be logged in
    if (this.loginForm.valid) {
      if (localStorage.getItem('signedUpUsers')) {
        this.signedUpUsers = JSON.parse(localStorage.getItem('signedUpUsers'));
        let currentUser = this.signedUpUsers.find(user => user.email == this.loginForm.value.email);

        if (currentUser) {
          sessionStorage.setItem('currentUser', this.loginForm.value.email);
          this.router.navigate(['products']);
        } else {
          this.signedUpUsers.push({ email: this.loginForm.value.email, password: this.loginForm.value.password });
          localStorage.setItem('signedUpUsers', JSON.stringify(this.signedUpUsers));
          sessionStorage.setItem('currentUser', this.loginForm.value.email);
          this.router.navigate(['products']);
        }
      } else {
        this.signedUpUsers.push({ email: this.loginForm.value.email, password: this.loginForm.value.password });
        localStorage.setItem('signedUpUsers', JSON.stringify(this.signedUpUsers));
        sessionStorage.setItem('currentUser', this.loginForm.value.email);
        this.router.navigate(['products']);
      }
    }
  }
}
