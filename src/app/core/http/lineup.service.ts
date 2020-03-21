import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lineup, Member } from '@shared/models';
import { Observable } from 'rxjs';

const url = 'lineups';
const routes = {
  lineups: (teamId: number) => `/teams/${teamId}/${url}`,
  lineup: (teamId: number) => `/teams/${teamId}/${url}/current`,
  update: (teamId: number, id: number) => `/teams/${teamId}/${url}/${id}`,
  likely: (teamId: number) => `/teams/${teamId}/${url}/likely`
};

@Injectable({ providedIn: 'root' })
export class LineupService {
  private static cleanLineup(lineup: Lineup): Lineup {
    const newLineup: Lineup = JSON.parse(JSON.stringify(lineup));
    newLineup.dispositions = newLineup.dispositions.filter(
      value => value.member_id !== null
    );
    newLineup.dispositions.map(disp => delete disp.member);
    delete newLineup.team;
    delete newLineup.modules;
    delete newLineup.module_object;

    return newLineup;
  }

  constructor(private readonly http: HttpClient) { }

  getLineup(teamId: number): Observable<Lineup> {
    return this.http.get<Lineup>(routes.lineup(teamId));
  }

  update(lineup: Lineup): Observable<any> {
    return this.http.put(routes.update(lineup.team_id, lineup.id), JSON.stringify(LineupService.cleanLineup(lineup)));
  }

  create(lineup: Lineup): Observable<Lineup> {
    return this.http.post<Lineup>(routes.lineups(lineup.team_id), JSON.stringify(LineupService.cleanLineup(lineup)));
  }

  getLikelyLineup(lineup: Lineup): Observable<Array<Member>> {
    return this.http.get<Array<Member>>(routes.likely(lineup.team_id));
  }
}