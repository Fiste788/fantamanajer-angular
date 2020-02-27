import { AnimationEvent } from '@angular/animations';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { listItemAnimation, openOverlayAnimation } from '@app/core/animations';
import { Stream, StreamActivity } from '@app/core/models';
import { ApplicationService, NotificationService } from '@app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'fm-notification-overlay',
  templateUrl: './notification-overlay.component.html',
  styleUrls: ['./notification-overlay.component.scss'],
  animations: [
    openOverlayAnimation,
    listItemAnimation
  ]
})
export class NotificationOverlayComponent implements OnInit {
  stream: Observable<Stream>;
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  constructor(
    private readonly notificationService: NotificationService,
    private readonly app: ApplicationService
  ) { }

  ngOnInit(): void {
    if (this.app.team) {
      this.stream = this.notificationService.getNotifications(this.app.team.id);
    }
  }

  onAnimationStart(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation(): void {
    this.animationState = 'leave';
  }

  track(_: number, item: StreamActivity): number {
    return _; // or item.id
  }
}
