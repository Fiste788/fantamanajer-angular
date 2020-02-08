import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Score, Team } from '@app/core/models';
import { ScoreService } from '@app/core/services';
import { SharedService } from '@app/shared/services/shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'fm-score-edit',
  templateUrl: './score-edit.component.html',
  styleUrls: ['./score-edit.component.scss']
})
export class ScoreEditComponent implements OnInit {

  @ViewChild(NgForm) scoreForm: NgForm;
  team: Team;
  penality: boolean;
  selectedScore: Score;
  score: Observable<Score>;
  scores: Observable<Array<Score>>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scoreService: ScoreService,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.parent?.parent?.parent?.data.subscribe((data: { team: Team }) => {
      this.team = data.team;
      this.scores = this.scoreService.getScoresByTeam(this.team.id);
    });
  }

  getScore(event: MatSelectChange): void {
    this.selectedScore = event.value;
    this.score = this.scoreService.getScore(this.selectedScore.id, true);
  }

  save(score: Score): void {
    score.lineup.module = score.lineup.module_object?.key ?? '';
    score.lineup.dispositions.forEach(value => value.member_id = value.member?.id ?? null);
    this.scoreService.update(score)
      .subscribe(() => {
        this.snackBar.open('Punteggio modificato', undefined, {
          duration: 3000
        });
      },
        err => {
          SharedService.getUnprocessableEntityErrors(this.scoreForm, err);
        });
  }
}
