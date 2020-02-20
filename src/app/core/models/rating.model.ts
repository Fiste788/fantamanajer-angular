import { Matchday, Member } from './';

// tslint:disable: variable-name
export class Rating {
  id: number;
  valued: boolean;
  points: number;
  points_no_bonus: number;
  rating: number;
  goals: number;
  goals_against: number;
  goals_victory: number;
  goals_tie: number;
  assist: number;
  yellow_card: boolean;
  red_card: boolean;
  penalities_scored: number;
  penalities_taken: number;
  present: boolean;
  regular: boolean;
  quotation: number;
  member_id: number;
  matchday_id: number;
  member: Member;
  matchday: Matchday;
}
