import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { UserModule } from './user.module';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    SharedModule,
    UserModule,
    UserRoutingModule
  ],
  declarations: [ProfileComponent],
})
export class UserLazyModule { }
