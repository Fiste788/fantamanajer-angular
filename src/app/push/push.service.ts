import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwPush } from '@angular/service-worker';
import { SubscriptionService } from '../subscription/subscription.service';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/notification';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/isEmpty';

@Injectable()
export class PushService {
  private subscribed = false;
  // private notificationComponent: NotificationListComponent = null;

  constructor(
    public subscription: SubscriptionService,
    public swPush: SwPush,
    public snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {
    /*const obs = this.swPush.subscription.isEmpty();
    obs.subscribe(
      sub => {
        if (sub) {
          this.subscribeToPush();
        }
      },
      err => console.log(err),
      () => console.log('completed')
    );*/
  }

  subscribeToPush() {
    // Requesting messaging service to subscribe current client (browser)
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.vapidPublicKey
      })
      .then(pushSubscription => {
        // Passing subscription object to our backend
        this.subscription.add(pushSubscription).subscribe(res => {
          const snackBarRef = this.snackBar.open(
            'Now you are subscribed',
            null,
            {
              duration: 2000
            }
          );
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  unsubscribeFromPush() {
    // Get active subscription
    this.swPush.subscription.take(1).subscribe(pushSubscription => {
      // Delete the subscription from the backend
      this.subscription.delete(pushSubscription.endpoint).subscribe(res => {
        const snackBarRef = this.snackBar.open(
          'Now you are unsubscribed',
          null,
          {
            duration: 2000
          }
        );

        // Unsubscribe current client (browser)
        pushSubscription
          .unsubscribe()
          .then(success => {
            console.log('[App] Unsubscription successful', success);
          })
          .catch(err => {
            console.log('[App] Unsubscription failed', err);
          });
      });
    });
  }

  showMessages() {
    /*const notifications = this.swPush.messages.map((message, index) => {
      const not = new Notification();
      not.title = message['notification']['title'];
      return not;
    });
    const notif = this.inj.get(NotificationListComponent).notifications;
    notif.concatMap(val => notifications);*/
    this.swPush.messages.subscribe(message => {
      console.log('[App] Push message received', message);
      this.notificationService.broadcast(message['notification']['title'], '');
    });
    /* this.swPush.messages.subscribe(message => {
      console.log('[App] Push message received', message);

      const notification = message['notification'];

      /*this.messages.unshift({
        text: notification['body'],
        id_str: notification['tag'],
        favorite_count: notification['data']['favorite_count'],
        retweet_count: notification['data']['retweet_count'],
        user: {
          name: notification['title']
        }
      });
    });*/
  }
}
