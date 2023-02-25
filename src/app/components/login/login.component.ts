import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  private asyncPasswordValidation(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === 'text') return of(null);
      else return of({ key: 'incorrect description' });
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder();

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['admin'])
    }
  }

  private formBuilder() {
    const form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
      description: new FormControl('', {
        asyncValidators: this.asyncPasswordValidation(),
      })
    });

    return form;
  }

  submitLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['admin']), //как res в promise
      error: (err) => alert(err.message),
    });
  }
}
