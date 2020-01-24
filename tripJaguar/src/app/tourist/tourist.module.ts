import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TouristRoutingModule } from './tourist-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservarComponent } from './reservar/reservar.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaypalComponent } from './paypal/paypal.component';

@NgModule({
  imports: [
    CommonModule,
    TouristRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ProfileComponent, HomeComponent, ReservasComponent, ReservarComponent, PaypalComponent],
  exports:[TouristRoutingModule,PaypalComponent]
})
export class TouristModule { }
