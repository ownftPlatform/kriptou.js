/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { Kriptou } from '../index';
import { logUtil } from '../util/log-util';

export interface KriptouConfigInternal {
    /**
     * The log level.
     */
    logger?: {
        level: Kriptou.Types.LogLevels;
    };

    /**
     * Chain/network configuration.
     */
    chain?: {
        performValidation?: boolean;
        delayValidation?: boolean;
        supportedChains?: Array<number>;
        walletNotConnectedHandler?: () => void;
        chainCheckFailedHandler?: () => void;

        /**
         * Whether the page reloads when the chain/network has changed.
         */
        changeReloadEnabled?: boolean;
    };

    /**
     * Accounts configuration.
     */
    accounts?: {
        /**
         * Whether the page reloads when the account has changed.
         *
         * When the `changeHandler` is configured this setting is ignored and the page reload will not execute.
         */
        changeReloadEnabled: boolean;

        /**
         * Handler to execute when the account has changed.
         *
         * When this handler is configured then the page will not auto reload, the developer will have to implement the
         * page-reload in the handler if this behaviour is required.
         */
        changeHandler?: (accounts: Array<string>) => void;
    };

    /**
     * Wyvern Protocol configuration.
     */
    wyvernProtocol?: {
        /**
         * The address of the deployed exchange.
         */
        exchangeAddress: string;
    };
}

const logger = logUtil.getLogger('ConfigService');

export class ConfigService {
    public get isNetworkChangeReloadEnabled(): boolean {
        return this.networkChangeReloadEnabled;
    }

    public get isAccountsChangeReloadEnabled(): boolean {
        return this.accountsChangeReloadEnabled;
    }

    private networkChangeReloadEnabled: boolean = true;
    private accountsChangeReloadEnabled: boolean = true;

    constructor(public readonly config?: Kriptou.Types.Config) {
        if (this.config !== undefined) {
            if (this.config.logger !== undefined) {
                logUtil.updateLevel(this.config.logger.level);
            }
            if (this.config.chain !== undefined && this.config.chain.changeReloadEnabled !== undefined) {
                this.networkChangeReloadEnabled = this.config.chain.changeReloadEnabled;
            }
            if (this.config.accounts !== undefined) {
                this.accountsChangeReloadEnabled = this.config.accounts.changeReloadEnabled;
                if (this.config.accounts.changeHandler !== undefined) {
                    // Disable reload when handler configured
                    this.accountsChangeReloadEnabled = false;
                }
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
