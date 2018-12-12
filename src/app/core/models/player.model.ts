import { Member } from './';

export class Player {
  id: number;
  name: string;
  surname: string;
  members: Member[];
  full_name: string;
  photo_url: string;
}