import { Component, OnChanges, OnInit } from '@angular/core';
import { ApplicationService, AuthService, LayoutService, PushService } from '@app/core/services';
import { Championship, Team } from '@app/shared/models';
import { combineLatest } from 'rxjs/operators';

@Component({
  selector: 'fm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  deferredPrompt?: BeforeInstallPromptEvent;
  loggedIn: boolean;
  team?: Team;
  championship?: Championship;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly auth: AuthService,
    private readonly push: PushService,
    private readonly app: ApplicationService
  ) { }

  ngOnInit(): void {
    this.init();
    this.push.beforeInstall.subscribe((e: BeforeInstallPromptEvent) => {
      this.deferredPrompt = e;
    });
    this.auth.userChange$.pipe(combineLatest(this.app.teamChange$))
      .subscribe(() => {
        this.init();
      });
  }

  init(): void {
    this.loggedIn = this.auth.loggedIn();
    this.team = this.app.team;
    this.championship = this.app.championship;
  }

  install(): void {
    if (this.deferredPrompt) {
      // Show the prompt
      void this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      void this.deferredPrompt.userChoice
        .then(() => {
          this.deferredPrompt = undefined;
        });
    }
  }

  closeSidenav(): void {
    this.layoutService.closeSidebar();
  }

}
