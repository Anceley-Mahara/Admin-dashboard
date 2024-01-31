import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from 'app/pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginLayoutRoutes } from './login-layout.routing';
import { RegisterComponent } from 'app/pages/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
  ]
})

export class LoginLayoutModule {}
