import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLoading = true;
    localStorage.setItem("role", this.form.role);
    localStorage.setItem("email", this.form.email);
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/dashboard']);
        this.isLoading = false;

      },
      err => {
        this.errorMessage = err;
        console.error('There is an Error:', err);
        this.isSignUpFailed = true;
        this.isLoading = false;
      }
    );
   }

}
