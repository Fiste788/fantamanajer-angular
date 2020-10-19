import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IRankingPosition, ScoreService } from '@app/http';
import { UtilService } from '@app/services';
import { tableRowAnimation } from '@shared/animations/table-row.animation';
import { Championship } from '@shared/models';

@Component({
  animations: [tableRowAnimation],
  styleUrls: ['./ranking.page.scss'],
  templateUrl: './ranking.page.html',
})
export class RankingPage implements OnInit {
  public ranking$: Observable<Array<IRankingPosition>>;
  public rankingDisplayedColumns = ['teamName', 'points'];
  public matchdays: Array<number> = [];

  constructor(
    private readonly scoreService: ScoreService,
    private readonly route: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    const championship = UtilService.getSnapshotData<Championship>(this.route, 'championship');
    if (championship) {
      this.ranking$ = this.loadRanking(championship);
    }
  }

  public loadRanking(championship: Championship): Observable<Array<IRankingPosition>> {
    return this.scoreService.getRanking(championship.id)
      .pipe(
        tap((ranking: Array<IRankingPosition>) => {
          if (ranking.length && ranking[0].scores) {
            const matchdays = Object.keys(ranking[0].scores)
              .reverse();
            this.matchdays = matchdays.map((m) => +m);
            this.rankingDisplayedColumns = this.rankingDisplayedColumns.concat(matchdays);
          }
        }),
      );
  }

  public track(_: number, item: number): number {
    return item;
  }
}
