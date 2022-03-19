/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { BehaviorSubject, Subject } from 'rxjs';
import { Kriptou } from '../index';
import { logUtil } from '../util/log-util';
import { KriptouEventInternal } from '../event/event.service';

export enum StatusValue {
    NotReady,
    ReadyAndUserConnected,
    ReadyAndUserNotConnected,
    NoAccountsFound
}

const logger = logUtil.getLogger('StatusService');

export class StatusService {
    private readonly rxStatusUpdated: Subject<{ status: StatusValue; user: Kriptou.Types.User }> = new BehaviorSubject({
        status: StatusValue.NotReady,
        user: undefined
    });
    private readonly rxUserLoggedIn: Subject<Kriptou.Types.User> = new Subject();

    private statusValue: StatusValue = StatusValue.NotReady;
    // eslint-disable-next-line etc/no-commented-out-code
    // private subscriptions?: Map<string, (...args: any) => any> = new Map();
    // private userLoggedInSubscriptions?: Map<string, (...args: any) => any> = new Map();

    constructor() {
        logger.debug('ctor');
    }

    public isReadyAndUserConnected(): boolean {
        logger.debug('isReadyAndUserConnected:', this.statusValue === StatusValue.ReadyAndUserConnected);
        return this.statusValue === StatusValue.ReadyAndUserConnected;
    }

    public isReadyAndUserNotConnected(): boolean {
        logger.debug('isReadyAndUserNotConnected:', this.statusValue === StatusValue.ReadyAndUserNotConnected);
        return this.statusValue === StatusValue.ReadyAndUserNotConnected;
    }

    public updateStatus(status: StatusValue, user?: any): void {
        logger.debug('updateStatus:', status);
        this.statusValue = status;
        if (this.isReadyAndUserConnected()) {
            // this.userLoggedInSubscriptions?.forEach((value) => value({}));
            logger.debug('updateStatus - this.rxUserLoggedIn.next({});');
            this.rxUserLoggedIn.next(user);
            Kriptou.User.set(user);
        }
        // this.subscriptions?.forEach((value) => value());
        this.rxStatusUpdated.next({ status: this.statusValue, user });
    }

    public addStatusUpdatedSubscription(
        subscription: { listener: string; event: KriptouEventInternal },
        fn: (...args: any) => any
    ): Kriptou.Types.Subscription {
        return this.rxStatusUpdated.subscribe(fn);
    }
    public addUserLoggedInSubscription(
        subscription: { listener: string; event: KriptouEventInternal },
        fn: (...args: any) => any
    ): Kriptou.Types.Subscription {
        return this.rxUserLoggedIn.subscribe(fn);
    }
}
