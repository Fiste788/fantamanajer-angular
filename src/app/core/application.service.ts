import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, concat } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MatchdayService } from '../entities/matchday/matchday.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { UserService } from '../entities/user/user.service';
import { Matchday } from '../entities/matchday/matchday';
import { Team } from '../entities/team/team';
import { User } from '../entities/user/user';
import { Championship } from '../entities/championship/championship';
import { Season } from '../entities/season/season';

@Injectable()
export class ApplicationService {
  private season: Season;
  public seasonEnded: boolean;
  public matchday: Matchday;
  public championship: Championship;
  public team: Team;
  public user: User;
  public teams: Team[];

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private matchdayService: MatchdayService,
    private injector: Injector
  ) { }

  getCurrentMatchday(): Observable<void> {
    return this.matchdayService.getCurrentMatchday().pipe(map(matchday => {
      this.matchday = matchday;
      this.seasonEnded = matchday.number > 38;
      this.season = this.matchday.season;
    }));
  }

  initialize(): Promise<any> {
    this.auth.loggedUser.subscribe(this.setUser.bind(this));
    let observable = this.getCurrentMatchday();
    if (this.auth.loggedIn()) {
      observable = concat(observable, this.auth.getCurrentUser());
    }
    return observable.toPromise();
  }

  setUser(user?: User) {
    if (user) {
      this.user = user;
      this.loadTeams(user.teams);
    } else {
      this.team = null;
      this.getRouter().navigate(['/']);
    }
  }

  loadTeams(teams?: Team[]) {
    teams = teams || [];
    this.teams = teams;
    this.setCurrentTeam(this.teams[0]);
  }

  setCurrentTeam(team: Team) {
    if (team) {
      this.team = team;
      this.championship = team.championship;
    }
  }

  private getRouter(): Router {
    return this.injector.get(Router);
  }
}