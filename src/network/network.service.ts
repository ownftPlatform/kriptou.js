/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { Kriptou } from '../index';
import { Subject } from 'rxjs';
import { KriptouEventInternal } from '../events';
import { logUtil } from '../util/log-util';

declare let window: any;

export enum KriptouNetworkTypeInternal {
    Main = 1,
    Ropsten = 3,
    Rinkeby = 4,
    ArbitrumOne = 42161,
    ArbitrumRinkeby = 421611,
    PulsechainTest = 940
}

const networks: Record<KriptouNetworkTypeInternal, Kriptou.Types.Network> = {
    [KriptouNetworkTypeInternal.Main]: { chainId: KriptouNetworkTypeInternal.Main, name: 'Main' },
    [KriptouNetworkTypeInternal.Ropsten]: { chainId: KriptouNetworkTypeInternal.Ropsten, name: 'Ropsten Testnet' },
    [KriptouNetworkTypeInternal.Rinkeby]: { chainId: KriptouNetworkTypeInternal.Rinkeby, name: 'Rinkeby Testnet' },
    [KriptouNetworkTypeInternal.ArbitrumOne]: { chainId: KriptouNetworkTypeInternal.ArbitrumOne, name: 'Arbitrum One' },
    [KriptouNetworkTypeInternal.ArbitrumRinkeby]: {
        chainId: KriptouNetworkTypeInternal.ArbitrumRinkeby,
        name: 'Arbitrum Rinkeby'
    },
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

    public setChainIdHex(_chainId: number /* hexadecimal */): void {
        this.setChainIdDecimal(parseInt(String(_chainId), 16));
    }

    public setChainIdDecimal(chainId: number): void {
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

    public async switch(): Promise<void> {
        if (window === undefined || window.provider === undefined) {
            return Promise.reject(new Error('Network switching - window.provider does not exist'));
        }

        try {
            await window.provider.send('wallet_switchEthereumChain', [
                { chainId: `0x${KriptouNetworkTypeInternal.ArbitrumRinkeby.toString(16)}` }
            ]);
            logger.debug('You have succefully switched to Binance Test network');
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                logger.warn('This network is not available in your metamask, please add it', switchError);
                return this.addNetwork();
            }
            logger.error('Failed to switch to the network:', switchError);
        }
    }

    private async addNetwork(): Promise<void> {
        if (window === undefined || window.provider === undefined) {
            return Promise.reject(new Error('Network switching - window.provider does not exist'));
        }

        try {
            await window.provider.send('wallet_addEthereumChain', [
                {
                    chainId: `0x${KriptouNetworkTypeInternal.ArbitrumRinkeby.toString(16)}`,
                    chainName: 'Arbitrum Rinkeby',
                    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
                    blockExplorerUrls: ['https://testnet.arbiscan.io/#'],
                    nativeCurrency: {
                        symbol: 'ARETH',
                        decimals: 18
                    }
                }
            ]);
            logger.debug('You have succefully added the network');
        } catch (switchError) {
            logger.error('Failed to switch to the network:', switchError);
        }
    }
}
