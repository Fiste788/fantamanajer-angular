import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [],
  providers: [UserService]
})
export class UserModule { }
