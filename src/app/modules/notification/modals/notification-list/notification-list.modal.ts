import { AnimationEvent } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { NotificationService } from '@data/services';
import { ApplicationService } from '@app/services';
import { listItemAnimation, openOverlayAnimation } from '@shared/animations';
import { Stream } from '@data/types';
import { tap } from 'rxjs/operators';

@Component({
  animations: [openOverlayAnimation, listItemAnimation],
  selector: 'app-notification-overlay',
  styleUrls: ['./notification-list.modal.scss'],
  templateUrl: './notification-list.modal.html',
})
export class NotificationListModal implements OnInit {
  @Output() readonly seen: EventEmitter<Stream> = new EventEmitter<Stream>();

  public stream$: Observable<Stream>;
  public animationState: 'void' | 'enter' | 'leave' = 'enter';
  public animationStateChanged = new EventEmitter<AnimationEvent>();

  constructor(
    private readonly notificationService: NotificationService,
    private readonly app: ApplicationService,
  ) {}

  public ngOnInit(): void {
    if (this.app.team) {
      this.stream$ = this.notificationService.getNotifications(this.app.team.id).pipe(
        tap((res) => {
          this.seen.emit(res);
        }),
      );
    }
  }

  public onAnimationStart(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  public onAnimationDone(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  public startExitAnimation(): void {
    this.animationState = 'leave';
  }

  public track(_: number): number {
    return _; // or item.id
  }
}
