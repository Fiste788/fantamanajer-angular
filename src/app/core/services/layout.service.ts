import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { VisibilityState } from '@app/enums/visibility-state';

import { ScrollService } from './scroll.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  public openSidebarSubject = new BehaviorSubject<boolean>(false);
  public openedSidebar$ = this.openSidebarSubject.asObservable();
  public isReadySubject = new BehaviorSubject<boolean>(false);
  public isReady$ = this.isReadySubject.asObservable()
    .pipe(distinctUntilChanged());

  private readonly showSpeedDialSubject = new BehaviorSubject<boolean>(false);
  public isShowSpeedDial$ = this.showSpeedDialSubject.asObservable()
    .pipe(map(s => s ? VisibilityState.Visible : VisibilityState.Hidden));
  private readonly showToolbarSubject = new BehaviorSubject<boolean>(true);
  public isShowToolbar$ = this.showToolbarSubject.asObservable()
    .pipe(map(s => s ? VisibilityState.Visible : VisibilityState.Hidden));
  private subscriptions: Array<Subscription> = [];

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly scrollService: ScrollService,
  ) {
  }

  public connect(): void {
    this.isHandset$.subscribe((e) => {
      this.openSidebarSubject.next(!e);
      this.showSpeedDialSubject.next(this.showSpeedDialSubject.value || e);
      this.showToolbarSubject.next(true);
      if (e) {
        this.setReady();
      }
    });
  }

  public connectScrollAnimation(upCallback: () => void, downCallback: () => void, offset = 0): void {
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        if (!this.subscriptions.length) {
          this.subscriptions = this.applyScrollAnimation(upCallback, downCallback, offset);
        }
      } else if (this.subscriptions.length) {
        this.subscriptions.forEach((sub) => {
          sub.unsubscribe();
        });
        this.subscriptions = [];
      }
    });
  }

  public applyScrollAnimation(upCallback: () => void, downCallback: () => void, offset = 0): Array<Subscription> {
    this.scrollService.connectScrollAnimation(offset);
    const subs: Array<Subscription> = [];

    subs.push(this.scrollService.goingUp$.subscribe(() => {
      this.showSpeedDial();
      this.showToolbar();
      upCallback();
    }));

    subs.push(this.scrollService.goingDown$.subscribe(() => {
      this.hideSpeedDial();
      this.hideToolbar();
      downCallback();
    }));

    return subs;
  }

  public openSidebar(): void {
    this.openSidebarSubject.next(true);
  }

  public closeSidebar(): void {
    this.openSidebarSubject.next(false);
  }

  public toggleSidebar(): void {
    this.openSidebarSubject.next(!this.openSidebarSubject.value);
  }

  public showSpeedDial(): void {
    this.showSpeedDialSubject.next(true);
  }

  public hideSpeedDial(): void {
    this.showSpeedDialSubject.next(false);
  }

  public showToolbar(): void {
    this.showToolbarSubject.next(true);
  }

  public hideToolbar(): void {
    this.showToolbarSubject.next(false);
  }

  public setReady(): void {
    this.isReadySubject.next(true);
  }
}
