/** ***********************
 * MIT
 * Copyright (c) 2022 ownft Platform
 **************************/

import { logUtil } from '../util/log-util';
import { StatusService } from '../status/status.service';
import { NetworkService } from '../network/network.service';
import { Kriptou } from '../index';

export enum KriptouEventInternal {
    StatusUpdated,
    UserLoggedIn,
    NetworkUpdated
}

export interface KriptouSubscriptionInternal {
    unsubscribe(): void;
}

const logger = logUtil.getLogger('EventService');

export class EventService {
    constructor(private statusService: StatusService, private networkService: NetworkService) {}

    public subscribe(
        subscription: { listener: string; event: KriptouEventInternal },
        fn: (...args: any) => any
    ): Kriptou.Types.Subscription {
        logger.debug('subscribe - subscription:', subscription);
        switch (subscription.event) {
            case KriptouEventInternal.StatusUpdated:
                return this.statusService.addStatusUpdatedSubscription(subscription, fn);
            case KriptouEventInternal.UserLoggedIn:
                return this.statusService.addUserLoggedInSubscription(subscription, fn);
            case KriptouEventInternal.NetworkUpdated:
                return this.networkService.addNetworkUpdatedSubscription(subscription, fn);
        }
    }
}
