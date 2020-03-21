import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { LineupService } from '@app/http';
import { ApplicationService, UtilService } from '@app/services';
import { Lineup } from '@shared/models';

@Component({
  selector: 'fm-lineup-last',
  templateUrl: './lineup-last.component.html',
  styleUrls: ['./lineup-last.component.scss']
})
export class LineupLastComponent implements OnDestroy {
  @ViewChild(NgForm) lineupForm: NgForm;

  lineup$: Observable<Lineup>;
  editMode = false;
  teamId: number;
  private subscription: Subscription;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly lineupService: LineupService,
    private readonly route: ActivatedRoute,
    public app: ApplicationService
  ) {
    this.teamId = this.route.parent?.parent?.parent?.snapshot.data.team.id;
    this.editMode = this.app.team?.id === this.teamId;
    this.lineup$ = this.lineupService.getLineup(this.teamId);
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  save(lineup: Lineup): void {
    lineup.module = lineup.module_object?.key ?? '';
    lineup.dispositions.forEach(value => value.member_id = value.member?.id);
    let obs: Observable<Lineup>;
    let message: string;
    if (lineup.id) {
      message = 'Formazione aggiornata';
      obs = this.lineupService.update(lineup);
    } else {
      message = 'Formazione caricata';
      obs = this.lineupService.create(lineup);
    }
    this.subscription = obs.subscribe(response => {
      if (response.id) {
        lineup.id = response.id;
      }
      this.snackBar.open(message, undefined, {
        duration: 3000
      });
    },
      err => {
        UtilService.getUnprocessableEntityErrors(this.lineupForm, err);
      });
  }
}
