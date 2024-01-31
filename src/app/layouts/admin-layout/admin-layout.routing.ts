import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';
import { ItemDetailComponent } from 'app/pages/item-detail/item-detail.component';
import { InstitutionConfirmationComponent } from 'app/pages/institution-confirmation/institution-confirmation.component';
import { InstitutionDetailComponent } from 'app/pages/institution-detail/institution-detail.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent },
    {path: 'user', component: UserComponent },
    {path: 'logout', component:LogoutComponent},
    {path: 'applications/:id', component: ItemDetailComponent },
    {path: 'institution-confirmation', component: InstitutionConfirmationComponent },
    {path: 'institution-detail', component: InstitutionDetailComponent },
    
];
