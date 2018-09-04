import { Component, OnInit } from '@angular/core';
import { Role } from '../../entities/role/role';
import { Member } from '../../entities/member/member';
import { MemberService } from '../../entities/member/member.service';
import { ApplicationService } from '../../core/application.service';
import { Observable } from 'rxjs';
import { TeamService } from '../../entities/team/team.service';
import { Team } from '../../entities/team/team';

@Component({
  selector: 'fm-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {

  public roles: Map<Role, {
    count: number,
    label: string,
    entries?: any[],
    members?: Member[]
  }> = new Map<Role, {
    count: number,
    label: string,
    entries: any[],
    members: Member[]
  }>();
  public teams: Observable<Team[]>;
  public team: Team;
  public keys: Role[];

  constructor(private teamService: TeamService,
    private memberService: MemberService,
    private app: ApplicationService) {
    this.roles.set(new Role(1, 'P'), { count: 3, label: 'Portiere' });
    this.roles.set(new Role(2, 'D'), { count: 8, label: 'Difensore' });
    this.roles.set(new Role(3, 'C'), { count: 8, label: 'Centrocampista' });
    this.roles.set(new Role(4, 'A'), { count: 6, label: 'Attaccante' });
    this.keys = Array.from(this.roles.keys());
  }


  ngOnInit() {
    this.teams = this.teamService.getTeams(this.app.championship.id);

  }

  onChange() {
    console.log('change');
    this.memberService.getByTeamId(this.team.id).subscribe(members => {
      this.team.members = members;
      let i = 0;
      for (i = 0; i < 25; i++) {
        if (this.team.members.length < i) {
          this.team.members[i] = null;
        }
      }
      this.roles.forEach((val, key) => {
        this.roles.get(key).entries = Array(val.count);

      });
      this.memberService.getAllFree(this.app.championship.id).subscribe(res => {
        this.roles.forEach((value, key) => {
          value.members = this.team.members.filter(entry => entry && entry.role_id === key.id);
          value.members = value.members.concat(res[key.id]);
        });
      });

    });
  }

  onMemberChange() {

  }

  compareTeam(c1: Team, c2: Team): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareMember(c1: Member, c2: Member): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  getIndex(key, key2): number {
    let count = 0;
    let i = 0;
    const index = this.keys.indexOf(key);
    for (i = 0; i < index; i++) {
      count += Array.from(this.roles.values())[i].entries.length;
    }
    return count + key2;
  }

  save() {
    this.teamService.update(this.team).subscribe(res => console.log(res));
  }


}
