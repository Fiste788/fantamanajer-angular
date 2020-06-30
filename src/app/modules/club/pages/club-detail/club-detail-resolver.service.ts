import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ClubService } from '@app/http';
import { Club } from '@shared/models';

@Injectable()
export class ClubDetailResolver implements Resolve<Club | undefined> {
  constructor(private readonly cs: ClubService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Club> | undefined {
    const clubId = route.paramMap.get('id');
    if (clubId !== null) {
      const id = +clubId;

      return this.cs.getClub(id);
    }

    return undefined;
  }
}
