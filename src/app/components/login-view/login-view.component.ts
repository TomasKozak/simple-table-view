import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent {

  constructor (
    private router: Router,
  ){};

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.loginForm.valid) {
      localStorage.setItem("username", this.loginForm.get('username')?.value);
      this.router.navigate(['/index']);
    }
  }

}
