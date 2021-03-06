import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TeamService } from '@data/services';
import { ApplicationService } from '@app/services';
import { createBoxAnimation } from '@shared/animations';
import { NotificationSubscription, Team } from '@data/types';
import { Subscription } from 'rxjs';

@Component({
  animations: [createBoxAnimation],
  styleUrls: ['./team-edit.modal.scss'],
  templateUrl: './team-edit.modal.html',
})
export class TeamEditModal implements OnDestroy {
  public validComboDrag = false;
  public invalidComboDrag = false;
  public team: Team;
  public file: File;

  private readonly subscriptions = new Subscription();

  public static objectToPostParams(
    team: Team,
    fieldName: 'email_notification_subscriptions' | 'push_notification_subscriptions',
    formData: FormData,
  ): void {
    team[fieldName].forEach((element: NotificationSubscription, i) => {
      if (element.enabled) {
        Object.keys(element)
          .filter((f): f is keyof NotificationSubscription => f !== ('id' as const))
          .forEach((field) => {
            let value = element[field];
            if (field === 'enabled') {
              value = 1;
            }
            formData.append(`${fieldName}[${i}][${field}]`, value as string);
          });
      }
    });
  }

  constructor(
    public app: ApplicationService,
    private readonly teamService: TeamService,
    private readonly dialogRef: MatDialogRef<TeamEditModal>,
    @Inject(MAT_DIALOG_DATA) public data: { team: Team },
  ) {
    this.team = data.team;
  }

  public save(): void {
    const fd = new FormData();
    // eslint-disable-next-line
    if (this.file !== undefined) {
      fd.set('photo', this.file);
    }
    fd.set('name', this.team.name);
    TeamEditModal.objectToPostParams(this.team, 'email_notification_subscriptions', fd);
    TeamEditModal.objectToPostParams(this.team, 'push_notification_subscriptions', fd);
    this.subscriptions.add(
      this.teamService.upload(this.team.id, fd).subscribe(() => {
        this.dialogRef.close(true);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
