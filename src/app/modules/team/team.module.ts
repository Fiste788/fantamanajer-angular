import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MemberCommonModule } from '@app/modules/member-common/member-common.module';
import { StreamModule } from '@app/modules/stream/stream.module';
import { SharedModule } from '@app/shared/shared.module';
import { ngfModule } from 'angular-file';
import { NotificationSubscriptionModule } from '../notification-subscription/notification-subscription.module';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamStreamComponent } from './components/team-stream/team-stream.component';
import { TeamEditDialogComponent } from './modals/team-edit-dialog/team-edit-dialog.component';
import { TeamDetailResolver } from './pages/team-detail/team-detail-resolver.service';
import { TeamDetailComponent } from './pages/team-detail/team-detail.component';
import { TeamListComponent } from './pages/team-list/team-list.component';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TeamRoutingModule,
    MemberCommonModule,
    MatDialogModule,
    NotificationSubscriptionModule,
    StreamModule,
    ngfModule
  ],
  declarations: [
    TeamListComponent,
    TeamDetailComponent,
    TeamMembersComponent,
    TeamEditDialogComponent,
    TeamStreamComponent
  ],
  providers: [
    TeamDetailResolver
  ]
})
export class TeamModule { }
