import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberCommonModule } from '@app/modules/member-common/member-common.module';
import { MemberComponent } from './pages/member/member.component';
import { MemberFreeComponent } from './pages/member-free/member-free.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MemberCommonModule,
        MemberRoutingModule
    ],
    exports: [],
    declarations: [
        MemberFreeComponent,
        MemberComponent
    ],
})
export class MemberModule { }
