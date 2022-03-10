import { Kriptou } from './index';
import { Subject } from 'rxjs';
import { KriptouEventInternal } from './events';

export enum KriptouNetworkTypeInternal {
    MAIN = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    ARBITRUM_ONE = 42161,
    RINKARBY = 421611,
    PULSECHAIN_TEST = 940
}

const networks: Record<KriptouNetworkTypeInternal, Kriptou.Types.Network> = {
    [KriptouNetworkTypeInternal.MAIN]: { chainId: KriptouNetworkTypeInternal.MAIN, name: 'Main' },
    [KriptouNetworkTypeInternal.ROPSTEN]: { chainId: KriptouNetworkTypeInternal.ROPSTEN, name: 'Ropsten Testnet' },
    [KriptouNetworkTypeInternal.RINKEBY]: { chainId: KriptouNetworkTypeInternal.RINKEBY, name: 'Rinkeby Testnet' },
    [KriptouNetworkTypeInternal.ARBITRUM_ONE]: { chainId: KriptouNetworkTypeInternal.ARBITRUM_ONE, name: 'Arbitrum One' },
    [KriptouNetworkTypeInternal.RINKARBY]: { chainId: KriptouNetworkTypeInternal.RINKARBY, name: 'Arbitrum Testnet' },
    [KriptouNetworkTypeInternal.PULSECHAIN_TEST]: {
        chainId: KriptouNetworkTypeInternal.PULSECHAIN_TEST,
        name: 'PulseChain Testnet'
    }
};

export interface KriptouNetworkInternal {
    name: string;
    chainId: number;
}

export class NetworkService {
    private readonly rxNetworkUpdated: Subject<Kriptou.Types.Network | undefined> = new Subject();

    constructor(public network?: Kriptou.Types.Network) {
        console.log('NetworkService :: ctor');
    }

    public setChainId(chainId: number): void {
        this.network = networks[chainId];
        if (this.network === undefined) {
            console.warn('ChainId not supported: ' + chainId);
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
