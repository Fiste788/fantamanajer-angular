import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationService } from '@app/core/services/application.service';
import { tabTransition } from '@app/core/animations/tab-transition.animation';

@Component({
  selector: 'fm-championship',
  templateUrl: './championship.component.html',
  animations: [tabTransition]
})
export class ChampionshipComponent {

  public tabs: { label: string; link: string }[] = [
    { label: 'Squadre', link: 'teams' },
    { label: 'Classifica', link: 'ranking' },
    { label: 'Giocatori liberi', link: 'members/free' },
    { label: 'Articoli', link: 'articles' },
    { label: 'Attività', link: 'stream' },
  ];

  constructor(app: ApplicationService) {
    if (app.user?.admin || app.team?.admin) {
      this.tabs.push({ label: 'Admin', link: 'admin' });
    }
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

}
