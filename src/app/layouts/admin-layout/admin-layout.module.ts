import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionConfirmationComponent } from 'app/pages/institution-confirmation/institution-confirmation.component';
import { ItemDetailComponent } from 'app/pages/item-detail/item-detail.component';
import { InstitutionDetailComponent } from 'app/pages/institution-detail/institution-detail.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    LogoutComponent,
    InstitutionConfirmationComponent,
    ItemDetailComponent,
    InstitutionDetailComponent,
  ]
})

export class AdminLayoutModule {}
