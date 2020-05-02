import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PushSubscription } from '@shared/models';

const url = 'push-subscriptions';
const routes = {
  add: `/${url}`
};

@Injectable({ providedIn: 'root' })
export class PushSubscriptionService {

  constructor(private readonly http: HttpClient) { }

  add(subscription: PushSubscription): Observable<Partial<PushSubscription>> {
    return this.http.post(routes.add, subscription);
  }

  delete(endpoint: string): Observable<{}> {
    return this.http.delete(`${routes.add}/${encodeURIComponent(endpoint)}`);
  }
}
