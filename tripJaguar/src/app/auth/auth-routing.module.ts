import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterDetailComponent } from './register-detail/register-detail.component';
import { AuthGuard } from './guard/auth.guard';
import { ActivateComponent } from './activate/activate.component';
import { AuthFreeGuard } from './guard/auth-free.guard';


const authRoutes: Routes = [
  {
    path : '',
    children: [
      {
        path: '',
        canActivateChild:[AuthFreeGuard],
        children:[
          {path: 'login', component: LoginComponent},
          {path: 'registrarse', component: RegisterComponent},
          {path: 'registrarse/:option',component: RegisterDetailComponent },
          {path: 'activacion-cuenta/:id',component: ActivateComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports : [RouterModule]
})
export class AuthRoutingModule { }
