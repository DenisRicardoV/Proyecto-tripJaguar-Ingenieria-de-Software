import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAgencyGuard } from '../auth/guard/auth-agency.guard';
import { HomeComponent } from './home/home.component';
import { ToursListComponent } from './tours-list/tours-list.component';
import { ToursDetailComponent } from './tours-detail/tours-detail.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const agencyRoutes: Routes = [
  {
    path : 'agencia',
    // canActivate:[AuthAgencyGuard],
    component: HomeComponent,
    children: [
      {
        path:'',
        canActivateChild:[AuthAgencyGuard],
        children:[
          {
            path:'tours' ,
            children:[
              {path: '',pathMatch: 'full', redirectTo: 'lista'},
              { path:'lista' , component:ToursListComponent},
              { path:'nuevo' , component:ToursDetailComponent}
            ]
          },
          {
            path:'cuenta-paypal' ,
            component: AccountComponent
          },
          {
            path: 'dashboard', component: DashboardComponent
          },
          {
            path: '',pathMatch: 'full', redirectTo: 'dashboard'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(agencyRoutes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
