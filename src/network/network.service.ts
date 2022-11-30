/** ***********************
 * MIT
 * Copyright (c) 2022 OwNFT Market
 **************************/

import { Kriptou } from '../index';
import { Subject } from 'rxjs';
import { logUtil } from '../util/log-util';
import { KriptouEventInternal } from '../event/event.service';

export const networks = require('./evm-chains.json');

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
        this.network = networks.find((network) => network.chainId === chainId);
        if (this.network === undefined) {
            logger.warn('ChainId not supported by library: ' + chainId);
        } else if (!Kriptou.Config.current().validateNetwork(false)) {
            logger.warn('ChainId supported by library but not your app: ' + chainId);
        }

        this.rxNetworkUpdated.next(this.network);
    }

    public addNetworkUpdatedSubscription(
        subscription: { listener: string; event: KriptouEventInternal },
        fn: (...args: any) => any
    ): Kriptou.Types.Subscription {
        return this.rxNetworkUpdated.subscribe(fn);
    }

    public async switch(chainId: number): Promise<void> {
        if (globalThis === undefined || globalThis.provider === undefined) {
            return Promise.reject(new Error('Network switching - window.provider does not exist'));
        }

        const network: Kriptou.Types.Network = networks.find((_network) => _network.chainId === chainId);
        if (network === undefined) {
            logger.error('EVM chain not found for chainId ' + chainId);
            return Promise.reject(new Error('EVM chain not found for chainId ' + chainId));
        }

        try {
            await globalThis.provider.send('wallet_switchEthereumChain', [{ chainId: `0x${Number(chainId).toString(16)}` }]);
            logger.debug('You have succesfully switched to ' + network.name);
            return Promise.resolve();
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902 || switchError.code === -32603) {
                logger.warn('This network is not available in your metamask, please add it', switchError);
                return this.addNetwork(network);
            }
            logger.error('Failed to switch to the network:', switchError);
            return Promise.reject(switchError);
        }
    }

    private async addNetwork(network: Kriptou.Types.Network): Promise<void> {
        if (globalThis === undefined || globalThis.provider === undefined) {
            return Promise.reject(new Error('Network switching - window.provider does not exist'));
        }

        try {
            await globalThis.provider.send('wallet_addEthereumChain', [
                {
                    chainId: `0x${Number(network.chainId).toString(16)}`,
                    chainName: network.name,
                    rpcUrls: [network.rpc[0]],
                    blockExplorerUrls: [network.explorers[0].url],
                    nativeCurrency: {
                        symbol: network.nativeCurrency.symbol,
                        decimals: network.nativeCurrency.decimals
                    }
                }
            ]);
            logger.debug('You have succefully added the network');
            return Promise.resolve();
        } catch (switchError) {
            logger.error('Failed to add the network:', switchError);
            return Promise.reject(switchError);
        }
    }
}
