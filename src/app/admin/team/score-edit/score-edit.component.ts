import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Team } from '../../../entities/team/team';
import { Score } from '../../../entities/score/score';
import { ScoreService } from '../../../entities/score/score.service';
import { SharedService } from '../../../shared/shared.service';


@Component({
  selector: 'fm-score-edit',
  templateUrl: './score-edit.component.html',
  styleUrls: ['./score-edit.component.scss']
})
export class ScoreEditComponent implements OnInit {

  @ViewChild(NgForm) scoreForm: NgForm;
  public team: Team;
  public score: Observable<Score>;
  public scores: Observable<Score[]>;

  constructor(private route: ActivatedRoute,
    private scoreService: ScoreService,
    private snackBar: MatSnackBar,
    private shared: SharedService) { }

  ngOnInit() {
    this.route.parent.parent.parent.data.subscribe((data: { team: Team }) => {
      this.team = data.team;
      this.scores = this.scoreService.getScoresByTeam(this.team.id);
    });
  }

  getScore(event: MatSelectChange) {
    this.score = this.scoreService.getScore(event.value.id, true); // .pipe(map(score => score.lineup = score.lineup || new Lineup()));
  }

  save(score) {
    score.lineup.module = score.lineup.module_object.key;
    score.lineup.dispositions.forEach(value => value.member_id = value.member ? value.member.id : null);
    this.scoreService.update(score).subscribe(response => {
      this.snackBar.open('Punteggio modificato', null, {
        duration: 3000
      });
    },
      err => this.shared.getUnprocessableEntityErrors(this.scoreForm, err));
  }
}
