import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MdSidenav, MdMenu } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { SharedService } from './shared/shared.service';
import { SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent} from './speeddial/smd-fab-speed-dial';
import {ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'fm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(MdSidenav) nav: MdSidenav;

  openSpeeddial = false;
  title = 'FantaManajer';
  links = [
    {label: 'Articoli', link: 'articles'},
    {label: 'Squadre', link: 'teams'},
  ];

  constructor(public media: ObservableMedia,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public shared: SharedService) {
    this.shared.initialize();
  }

  changeTab(tab): void {
    this.router.navigate([tab], { relativeTo: this.route });
  }

  ngOnInit() {
    if (this.media.isActive('lt-sm')) {
      this.nav.close();
    }
  }

  _click(event: any) {
    console.log(event);
  }


}
