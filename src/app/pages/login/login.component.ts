import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  
  onSubmit(): void {
    this.isLoading = true;
    localStorage.setItem("role", this.form.role);
    localStorage.setItem("email", this.form.email);
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    );
    // if(this.isLoggedIn){
    //   this.router.navigate(['/dashboard']);
    // }
  }

  reloadPage(): void {
    window.location.reload();
  }

  register() {   
    // Navigate to the login page
    this.router.navigate(['/register']);
  }

}



