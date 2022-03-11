/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { Subject } from 'rxjs';
import { Kriptou } from './index';
import { KriptouEventInternal } from './events';
import { logUtil } from './util/log-util';

export enum StatusValue {
    NotReady,
    ReadyAndUserConnected,
    ReadyAndUserNotConnected
}

const logger = logUtil.getLogger('StatusService');

export class StatusService {
    private readonly rxStatusUpdated: Subject<StatusValue> = new Subject();
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

    public updateStatus(status: StatusValue, user: any): void {
        logger.debug('updateStatus:', status);
        this.statusValue = status;
        if (this.isReadyAndUserConnected()) {
            // this.userLoggedInSubscriptions?.forEach((value) => value({}));
            logger.debug('updateStatus - this.rxUserLoggedIn.next({});');
            this.rxUserLoggedIn.next(user);
            Kriptou.User.set(user);
        }
        // this.subscriptions?.forEach((value) => value());
        this.rxStatusUpdated.next(this.statusValue);
    }

    public addSubscription(subscription: { listener: string; events: Array<KriptouEventInternal> }, fn: (...args: any) => any) {
        this.rxStatusUpdated.subscribe(fn);
    }
    public addUserLoggedInSubscription(
        subscription: { listener: string; events: Array<KriptouEventInternal> },
        fn: (...args: any) => any
    ) {
        this.rxUserLoggedIn.subscribe(fn);
    }
}
