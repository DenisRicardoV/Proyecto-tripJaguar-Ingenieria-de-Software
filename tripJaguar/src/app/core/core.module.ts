import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { environment } from 'src/environments/environment';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthService } from './services/auth.service';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HomeComponent } from './home/home.component';
import { PaquetesService } from './services/paquetes.service';
import { AuthModule } from '../auth/auth.module';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { CryptoService } from './services/crypto.service';
import { SharedModule } from '../shared/shared.module';
import { TouristModule } from '../tourist/tourist.module';
import { httpInterceptorProviders } from './http-interceptors';
import { AgencyModule } from '../agency/agency.module';
import { ActividadesService } from './services/actividades.service';

import { ToursDetailComponent } from './tours/tours-detail/tours-detail.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BuscarComponent } from './tours/buscar/buscar.component';



@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CoreRoutingModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase,'tripJaguarDB'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AuthModule,
    TouristModule,
    AgencyModule,
    BrowserAnimationsModule,
    SharedModule,
    SlickCarouselModule

  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent, ToursDetailComponent, BuscarComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    AuthService,
    PaquetesService,
    HttpErrorHandlerService,
    MessageService,
    CryptoService,
    httpInterceptorProviders,
    ActividadesService,

  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
