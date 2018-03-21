import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Notification } from './notification';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

type MessageCallback = (payload: any) => void;

@Injectable()
export class NotificationService {
  notifications: Subject<Notification> = new Subject<Notification>();
  private url = 'notifications';

  constructor(private http: HttpClient) {}

  getNotifications(id: number): Observable<Notification[]> {
    const val = this.http.get<Notification[]>('teams/' + id + '/' + this.url);
    val.subscribe(arr => arr.map(value => this.notifications.next(value)));
    return val;
  }

  broadcast(title: string, url: string, severity?: number) {
    this.notifications.next(new Notification(title, url, severity));
  }

  subscribe(callback: MessageCallback): Subscription {
    return this.notifications.subscribe(callback);
  }
}