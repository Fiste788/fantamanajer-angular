import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { tabTransition } from 'app/shared/animations/tab-transition.animation';
import { RouterOutlet } from '@angular/router';
import { routerTransition } from 'app/shared/animations/router-transition.animation';

@Component({
  selector: 'fm-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [tabTransition, routerTransition]
})
export class UserComponent implements OnInit, AfterViewInit {

  public tabs: any = [
    { label: 'Profilo', link: '../profile' },
    { label: 'Attività', link: 'stream' }
  ];

  constructor() { }

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.tabGroup.selectedIndex = this.tabs.findIndex((value) => location.href.includes(value.link));
  }

  getState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRouteData.state : 'empty';
  }


}
