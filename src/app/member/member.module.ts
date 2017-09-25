import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberFreeComponent } from './member-free/member-free.component';
import { MemberService } from './member.service';

@NgModule({
  imports: [
    SharedModule,
    MemberRoutingModule
  ],
  exports: [MemberListComponent],
  declarations: [MemberListComponent, MemberFreeComponent, MemberComponent],
  providers: [MemberService]
})
export class MemberModule { }
