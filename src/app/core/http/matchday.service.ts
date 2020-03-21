import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matchday } from '@shared/models';
import { Observable } from 'rxjs';

const url = 'matchdays';
const routes = {
  matchday: (id: number) => `/${url}/${id}`,
  current: `/${url}/current`
};

@Injectable({ providedIn: 'root' })
export class MatchdayService {

  constructor(private readonly http: HttpClient) { }

  getMatchday(id: number): Observable<Matchday> {
    return this.http.get<Matchday>(routes.matchday(id));
  }

  getCurrentMatchday(): Observable<Matchday> {
    return this.http.get<Matchday>(routes.current, {
      withCredentials: false
    });
  }
}