import { Member } from './';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class Role {
  public id: number;
  public singolar: string;
  public plural: string;
  public abbreviation: string;
  public determinant: string;
  public best_players?: Array<Member>;
  public count: number;

  constructor(id: number, singolar: string, count: number, abbreviation?: string, plural?: string) {
    this.id = id;
    this.singolar = singolar;
    this.abbreviation = abbreviation ?? '';
    this.plural = plural ?? '';
    this.count = count;
  }
}
