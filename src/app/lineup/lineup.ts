import { Member } from '../member/member';
import { Matchday } from '../matchday/matchday';
import { Team } from '../team/team';
import { Disposition } from '../disposition/disposition';

export class Lineup {
  id: number;
  module: string;
  jolly: boolean;
  captain_id: number;
  vcaptain_id: number;
  vvcaptain_id: number;
  matchday_id: number;
  team_id: number;
  captain: Member;
  vcaptain: Member;
  vvcaptain: Member;
  matchday: Matchday;
  team: Team;
  dispositions: Disposition[];
}
