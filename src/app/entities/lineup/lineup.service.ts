import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lineup } from './lineup';
import { SharedService } from '../../shared/shared.service';
import { Member } from '../member/member';

@Injectable()
export class LineupService {
  private url = 'lineups';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private shared: SharedService
  ) { }

  getLineup(
    team_id
  ): Observable<Lineup> {
    return this.http.get<Lineup>(`teams/${team_id}/${this.url}/current`);
  }

  update(lineup: Lineup): Observable<any> {
    return this.http.put(
      `teams/${lineup.team_id}/${this.url}/` + lineup.id,
      JSON.stringify(this.cleanLineup(lineup))
    );
  }

  create(lineup: Lineup): Observable<Lineup> {
    return this.http.post<Lineup>(
      `teams/${lineup.team_id}/${this.url}`,
      JSON.stringify(this.cleanLineup(lineup))
    );
  }

  private cleanLineup(lineup: Lineup): Lineup {
    const newLineup: Lineup = JSON.parse(JSON.stringify(lineup));
    newLineup.dispositions = newLineup.dispositions.filter(
      value => value.member_id
    );
    newLineup.dispositions.map(disp => delete disp.member);
    delete newLineup.team;
    delete newLineup.modules;
    delete newLineup.module_object;
    return newLineup;
  }

  getLikelyLineup(lineup: Lineup): Observable<Member[]> {
    return this.http.get<Member[]>(`teams/${lineup.team_id}/${this.url}/likely`);
  }
}
