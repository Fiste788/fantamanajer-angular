import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PushSubscription } from '@shared/models';
import { Observable } from 'rxjs';

const url = 'push-subscriptions';
const routes = {
  add: `/${url}`
};

@Injectable({ providedIn: 'root' })
export class PushSubscriptionService {

  constructor(private readonly http: HttpClient) { }

  add(subscription: PushSubscription): Observable<any> {
    return this.http.post(routes.add, subscription);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${routes.add}/${encodeURIComponent(endpoint)}`);
  }
}