import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '@app/core/models';
import { enterDetailAnimation } from '@app/core/animations';
import { ApplicationService } from '@app/core/services';
import { TeamEditDialogComponent } from '../../modals/team-edit-dialog/team-edit-dialog.component';

@Component({
  selector: 'fm-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
  animations: [enterDetailAnimation]
})
export class TeamDetailComponent implements OnInit {
  team: Observable<Team>;
  tabs: { label: string; link: string }[] = [];

  constructor(
    public app: ApplicationService,
    private route: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.team = this.route.data.pipe(map((data: { team: Team }) => {
      this.loadTabs(data.team);
      return data.team;
    }));
  }

  loadTabs(team: Team) {
    this.tabs = [];
    this.tabs.push({ label: 'Giocatori', link: 'players' });
    if (this.app.championship?.started) {
      if (!this.app.seasonEnded) {
        this.tabs.push({ label: 'Formazione', link: 'lineup/current' });
      }
      this.tabs.push({ label: 'Ultima giornata', link: 'scores/last' });
      if (!this.app.seasonEnded) {
        this.tabs.push({ label: 'Trasferimenti', link: 'transferts' });
      }
    }
    this.tabs.push({ label: 'Articoli', link: 'articles' });
    this.tabs.push({ label: 'Attività', link: 'stream' });
    if (this.app.user?.admin || team.admin) {
      this.tabs.push({ label: 'Admin', link: 'admin' });
    }
  }

  openDialog(team: Team): void {
    this.dialog.open(TeamEditDialogComponent, {
      data: { team }
    }).afterClosed().subscribe((t?: Observable<Team>) => {
      if (t) {
        this.team = t;
        this.team.subscribe(res => {
          if (this.app.team) {
            this.app.team.photo_url = res.photo_url;
            this.app.team.name = res.name;
            this.app.team.email_notification_subscriptions = res.email_notification_subscriptions;
            this.app.team.push_notification_subscriptions = res.push_notification_subscriptions;
          }
          this.changeRef.detectChanges();
        });
      }
    });
  }

  getState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRouteData.state : '';
  }
}
