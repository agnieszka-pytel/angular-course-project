import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class AbstractSubscriptionComponent implements OnDestroy {
  protected _subscriptions: Subscription[];

  constructor () {
    this._subscriptions = [];
  }

  ngOnDestroy() {
    this._subscriptions
    .forEach((s:Subscription): void => s.unsubscribe())
  }
}
