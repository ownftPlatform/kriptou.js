/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { Kriptou } from '../index';
import { logUtil } from '../util/log-util';

export interface KriptouConfigInternal {
    logger?: {
        level: Kriptou.Types.LogLevels;
    };
    chain?: {
        performValidation?: boolean;
        delayValidation?: boolean;
        supportedChains?: Array<number>;
        walletNotConnectedHandler?: () => void;
        chainCheckFailedHandler?: () => void;
    };
    networkChangeReloadEnabled?: boolean;
}

const logger = logUtil.getLogger('ConfigService');

export class ConfigService {
    public get isNetworkChangeReloadEnabled(): boolean {
        return this.networkChangeReloadEnabled;
    }

    private networkChangeReloadEnabled: boolean = true;

    constructor(public readonly config?: Kriptou.Types.Config) {
        if (this.config !== undefined) {
            if (this.config.logger !== undefined) {
                logUtil.updateLevel(this.config.logger.level);
            }
            if (this.config.networkChangeReloadEnabled !== undefined) {
                this.networkChangeReloadEnabled = this.config.networkChangeReloadEnabled;
            }
        }
    }

    public enableNetworkChangeReload(): void {
        this.networkChangeReloadEnabled = true;
    }

    public disableNetworkChangeReload(): void {
        this.networkChangeReloadEnabled = false;
    }

    public async validateNetwork(): Promise<boolean> {
        const isWalletNotConnected: boolean = await ConfigService.isWalletNotConnected();
        if (isWalletNotConnected) {
            this.config.chain.walletNotConnectedHandler();
            return false;
        }

        if (!this.isCurrentChainValid()) {
            this.config.chain.chainCheckFailedHandler();
            return false;
        }
        return true;
    }

    private static isWalletNotConnected(): Promise<boolean> {
        // Disable it here and rather fire it in `validateNetwork` function
        return Kriptou.User.currentPromise(false).then((value) => value === undefined);
    }

    private isCurrentChainValid(): boolean {
        if (this.config === undefined) {
            return true;
        }

        if (!this.config.chain.performValidation) {
            return true;
        }

        if (Kriptou.Network.currentNetwork() === undefined) {
            logger.warn('isCurrentChainValid - Kriptou.Network.currentNetwork() === undefined');
            return false;
        }

        return !!this.config.chain.supportedChains.find((value) => value === Kriptou.Network.currentNetwork().chainId);
    }
}
