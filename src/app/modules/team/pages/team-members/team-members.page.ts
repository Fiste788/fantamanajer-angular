import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MemberService } from '@app/http';
import { UtilService } from '@app/services';
import { Member, Team } from '@shared/models';

@Component({
  styleUrls: ['./team-members.page.scss'],
  templateUrl: './team-members.page.html',
})
export class TeamMembersPage implements OnInit {
  public members$?: Observable<Array<Member>>;

  constructor(
    private readonly memberService: MemberService,
    private readonly route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.members$ = UtilService.getData<Team>(this.route, 'team')
      ?.pipe(switchMap(team => this.memberService.getByTeamId(team.id)));
  }
}
