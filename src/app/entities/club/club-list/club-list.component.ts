import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from '../club';
import { ClubService } from '../club.service';
import { CardCreationAnimation } from '../../../shared/animations/card-creation.animation';

@Component({
  selector: 'fm-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss'],
  animations: [CardCreationAnimation]
})
export class ClubListComponent implements OnInit {
  clubs: Observable<Club[]>;

  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    this.clubs = this.clubService.getClubs();
  }
}
