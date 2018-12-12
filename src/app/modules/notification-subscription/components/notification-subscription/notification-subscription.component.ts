import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Team, NotificationSubscription } from '@app/core/models';
import { notificationSubscriptions } from '../../notification-subscription.definition';

@Component({
  selector: 'fm-notification-subscription',
  templateUrl: './notification-subscription.component.html',
  styleUrls: ['./notification-subscription.component.scss']
})
export class NotificationSubscriptionComponent implements OnInit {
  @Input() type: string;
  @Input() label: string;
  @Input() subscriptions: NotificationSubscription[];
  @Output() subscriptionsChange: EventEmitter<NotificationSubscription[]>;
  @Input() team: Team;
  private keys: [{ name: string, label: string }];
  public map = new Map<{ name: string, label: string }, NotificationSubscription>();

  constructor() {
    this.subscriptionsChange = new EventEmitter<NotificationSubscription[]>();
  }

  ngOnInit() {
    this.keys = notificationSubscriptions[this.type];
    this.keys.forEach((element) => {
      let sub = this.subscriptions.find(subscription => subscription.name === element.name);
      if (!sub) {
        sub = new NotificationSubscription();
        sub.type = this.type;
        sub.name = element.name;
        sub.team_id = this.team.id;
        this.subscriptions.push(sub);
      }
      this.map.set(element, sub);
    });
  }

  toggle() {
    this.subscriptionsChange.emit(this.subscriptions);
  }
}