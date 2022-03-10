import { Subject } from 'rxjs';
import { Kriptou } from './index';
import { KriptouEventInternal } from './events';

export enum StatusValue {
    NotReady,
    ReadyAndUserConnected,
    ReadyAndUserNotConnected
}

export class StatusService {
    private readonly rxStatusUpdated: Subject<StatusValue> = new Subject();
    private readonly rxUserLoggedIn: Subject<Kriptou.Types.User> = new Subject();

    private statusValue: StatusValue = StatusValue.NotReady;
    // private subscriptions?: Map<string, (...args: any) => any> = new Map();
    // private userLoggedInSubscriptions?: Map<string, (...args: any) => any> = new Map();

    constructor() {
        console.log('StatusService :: ctor');
    }

    // static current(): Status {
    //     return status;
    // }
    // public isReady(): boolean {
    //     return Status.statusValue === StatusValue.Ready;
    // }

    public isReadyAndUserConnected(): boolean {
        console.log('StatusService :: isReadyAndUserConnected', this.statusValue === StatusValue.ReadyAndUserConnected);
        return this.statusValue === StatusValue.ReadyAndUserConnected;
    }

    public isReadyAndUserNotConnected(): boolean {
        console.log('StatusService :: isReadyAndUserNotConnected', this.statusValue === StatusValue.ReadyAndUserNotConnected);
        return this.statusValue === StatusValue.ReadyAndUserNotConnected;
    }

    public updateStatus(status: StatusValue, user: any): void {
        console.log('StatusService :: updateStatus', status);
        this.statusValue = status;
        if (this.isReadyAndUserConnected()) {
            // this.userLoggedInSubscriptions?.forEach((value) => value({}));
            console.log('StatusService :: updateStatus :: his.rxUserLoggedIn.next({});');
            this.rxUserLoggedIn.next(user);
            Kriptou.User.set(user);
        }
        // this.subscriptions?.forEach((value) => value());
        this.rxStatusUpdated.next(this.statusValue);
    }

    public addSubscription(subscription: { listener: string; events: Array<KriptouEventInternal> }, fn: (...args: any) => any) {
        // this.subscriptions?.set(subscription.listener, fn);
        this.rxStatusUpdated.subscribe(fn);
    }
    public addUserLoggedInSubscription(
        subscription: { listener: string; events: Array<KriptouEventInternal> },
        fn: (...args: any) => any
    ) {
        this.rxUserLoggedIn.subscribe(fn);
        // this.userLoggedInSubscriptions?.set(subscription.listener, fn);
    }
}
