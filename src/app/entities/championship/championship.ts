import { League } from '../league/league';
import { Season } from '../season/season';
import { Team } from '../team/team';

export class Championship {
  id: number;
  started: boolean;
  captain: boolean;
  captain_missed_lineup: boolean;
  points_missed_lineup: number;
  minute_lineup: number;
  number_selections: number;
  number_transferts: number;
  jolly: boolean;
  season_id: number;
  league_id: number;
  teams: Team[];
  league: League;
  season: Season;
}
