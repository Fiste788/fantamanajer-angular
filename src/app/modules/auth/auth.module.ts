import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard, NotLoggedGuard, AdminGuard, ChampionshipAdminGuard } from '@app/core/guards';
import { AuthRoutingModule } from './auth-routing.module';
import { JWTInterceptor } from '@app/core/interceptors';
import { LogoutComponent } from './pages/logout/logout.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    MatStepperModule
  ],
  providers: [

  ]
})
export class AuthModule { }
