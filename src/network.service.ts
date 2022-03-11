/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { Kriptou } from './index';
import { Subject } from 'rxjs';
import { KriptouEventInternal } from './events';
import { logUtil } from './util/log-util';

export enum KriptouNetworkTypeInternal {
    Main = 1,
    Ropsten = 3,
    Rinkeby = 4,
    ArbitrumOne = 42161,
    Rinkarby = 421611,
    PulsechainTest = 940
}

const networks: Record<KriptouNetworkTypeInternal, Kriptou.Types.Network> = {
    [KriptouNetworkTypeInternal.Main]: { chainId: KriptouNetworkTypeInternal.Main, name: 'Main' },
    [KriptouNetworkTypeInternal.Ropsten]: { chainId: KriptouNetworkTypeInternal.Ropsten, name: 'Ropsten Testnet' },
    [KriptouNetworkTypeInternal.Rinkeby]: { chainId: KriptouNetworkTypeInternal.Rinkeby, name: 'Rinkeby Testnet' },
    [KriptouNetworkTypeInternal.ArbitrumOne]: { chainId: KriptouNetworkTypeInternal.ArbitrumOne, name: 'Arbitrum One' },
    [KriptouNetworkTypeInternal.Rinkarby]: { chainId: KriptouNetworkTypeInternal.Rinkarby, name: 'Arbitrum Testnet' },
    [KriptouNetworkTypeInternal.PulsechainTest]: {
        chainId: KriptouNetworkTypeInternal.PulsechainTest,
        name: 'PulseChain Testnet'
    }
};

export interface KriptouNetworkInternal {
    name: string;
    chainId: number;
}

const logger = logUtil.getLogger('NetworkService');

export class NetworkService {
    private readonly rxNetworkUpdated: Subject<Kriptou.Types.Network | undefined> = new Subject();

    constructor(public network?: Kriptou.Types.Network) {
        logger.debug('ctor');
    }

    public setChainId(chainId: number): void {
        this.network = networks[chainId];
        if (this.network === undefined) {
            logger.warn('ChainId not supported: ' + chainId);
        }

        this.rxNetworkUpdated.next(this.network);
    }

    public addNetworkUpdatedSubscription(
        subscription: { listener: string; events: Array<KriptouEventInternal> },
        fn: (...args: any) => any
    ) {
        this.rxNetworkUpdated.subscribe(fn);
    }
}
