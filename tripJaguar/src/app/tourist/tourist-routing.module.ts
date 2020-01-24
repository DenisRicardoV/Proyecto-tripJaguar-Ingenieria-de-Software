import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProfileComponent } from './profile/profile.component';
import { AuthTouristGuard } from '../auth/guard/auth-tourist.guard';
import { HomeComponent } from './home/home.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservarComponent } from './reservar/reservar.component';


const touristRoutes: Routes = [
  {
    path : 'turista',
    // canActivate:[AuthTouristGuard],
    component:HomeComponent,
    children: [
      {
        path:'',
        canActivateChild:[AuthTouristGuard],
        children:[
          {path: '',pathMatch: 'full',redirectTo: 'perfil'},
          {path:'perfil', component: ProfileComponent},
          {path:'reservas', component: ReservasComponent},
          {path:'reservar/:id', component:ReservarComponent }
        ]
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(touristRoutes)],
  exports: [RouterModule]
})
export class TouristRoutingModule { }
