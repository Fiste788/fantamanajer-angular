import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Championship } from '../championship';
import { ApplicationService } from 'app/core/application.service';

@Injectable()
export class ChampionshipResolver implements Resolve<Championship> {
    constructor(private app: ApplicationService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Championship {
        return this.app.championship;
    }
}
