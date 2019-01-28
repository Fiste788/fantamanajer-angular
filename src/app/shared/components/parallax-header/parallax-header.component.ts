import { Component, Input, ViewChild, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { MainComponent } from '@app/shared/layout/main/main.component';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fm-parallax-header',
  templateUrl: './parallax-header.component.html',
  styleUrls: ['./parallax-header.component.scss']
})
export class ParallaxHeaderComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() public title: string;
  @Input() public subtitle: string;
  @Input() public image: string;
  @Input() public backgroundImage: any;
  // @Input() public backgroundUrls: any;
  @Input() public tabs: any[] = [];
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  public srcset = '';
  public width = 0;
  private subscription: Subscription;

  constructor(public main: MainComponent, private router: Router) {
    this.subscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.selectTabFromUrl();
      }
    });
  }

  ngOnChanges(changes) {
    this.selectTabFromUrl();
  }

  selectTabFromUrl() {
    if (this.tabGroup) {
      this.tabGroup.selectedIndex = this.tabs.findIndex((value) => location.href.includes(value.link));
    }
  }

  initialScroll(event: Event) {
    this.main.scrollTo(0, event.srcElement.clientHeight - 300);
  }

  ngAfterViewInit() {
    this.selectTabFromUrl();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
