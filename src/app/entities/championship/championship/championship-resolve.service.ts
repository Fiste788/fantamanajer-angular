import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Championship } from '../championship';
import { ApplicationService } from '../../../core/application.service';

@Injectable()
export class ChampionshipResolver implements Resolve<Championship> {
    constructor(private app: ApplicationService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Championship> {
        return of(this.app.championship);
    }
}
