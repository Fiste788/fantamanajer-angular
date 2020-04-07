import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MemberService } from '@app/http';
import { ApplicationService } from '@app/services';
import { cardCreationAnimation } from '@shared/animations';
import { Member, Role } from '@shared/models';

@Component({
  selector: 'fm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [cardCreationAnimation]
})
export class HomeComponent implements OnInit {

  roles$: Observable<Array<Role>>;

  constructor(
    private readonly memberService: MemberService,
    public app: ApplicationService
  ) { }

  ngOnInit(): void {
    this.roles$ = this.memberService.getBest();
  }

  track(_: number, item: Member): number {
    return item.id; // or item.id
  }
}
