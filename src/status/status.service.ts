/** ***********************
 * MIT
 * Copyright (c) 2022 ownft Platform
 **************************/

import { BehaviorSubject, Subject } from 'rxjs';
import { Kriptou } from '../index';
import { logUtil } from '../util/log-util';
import { KriptouEventInternal } from '../event/event.service';
import { ConfigService } from '../config/config.service';

export enum StatusValue {
    NotReady,
    ReadyAndUserConnected,
    ReadyAndUserNotConnected,
    NoAccountsFound,
    Web3NotSupported
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

    constructor(private configService: ConfigService) {
        logger.debug('ctor');
    }

    public checkWeb3NotSupportedStatus(): void {
        if (this.statusValue === StatusValue.Web3NotSupported) this.configService.config.browser.web3SupportCheckFailedHandler();
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
