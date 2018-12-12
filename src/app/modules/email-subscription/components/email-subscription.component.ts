import { Component, OnInit, Input } from '@angular/core';
import { EmailSubscription } from '@app/core/models';

@Component({
  selector: 'fm-email-subscription',
  templateUrl: './email-subscription.component.html',
  styleUrls: ['./email-subscription.component.scss']
})
export class EmailSubscriptionComponent implements OnInit {

  @Input() subscription: EmailSubscription;
  constructor() {

  }

  ngOnInit() {
  }

}