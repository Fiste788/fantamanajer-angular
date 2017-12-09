import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../shared/shared.service';
import { Score } from './score';
import { from } from 'rxjs/observable/from';
import { toArray, concatMap, map } from 'rxjs/operators';

@Injectable()
export class ScoreService {
  private url = 'scores';

  constructor(private http: HttpClient, private shared: SharedService) { }

  getRanking(): Observable<any> {
    return this.http.get(
      `championships/${this.shared.currentChampionship.id}/ranking`
    );
  }

  getRanking2(): Observable<any> {
    const rankingUrl = `championships/${this.shared.currentChampionship
      .id}/ranking`;
    return this.http
      .get(rankingUrl)
      .pipe(
      map(response => response['ranking']),
      concatMap(arr => from(arr)),
      toArray()
      );
    // ._catch(this.handleError);
  }

  getScore(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getLastScore(team_id: number): Observable<any> {
    return this.http.get(`teams/${team_id}/${this.url}/last`);
  }
}
