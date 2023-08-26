/** ***********************
 * MIT
 * Copyright (c) 2022 ownft Platform
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
     * Browser configuration.
     */
    browser?: {
        /**
         * Handler for the Web3 Support Check that fails.  If this is not configured and the check fails, an
         * old-fashioned alert will be displayed.
         */
        web3SupportCheckFailedHandler?: (chainId?: number) => void;
    };

    /**
     * Chain/network configuration.
     */
    chain?: {
        performValidation?: boolean;
        delayValidation?: boolean;
        supportedChains?: Array<number>;
        walletNotConnectedHandler?: () => void;

        /**
         * Handler for the Chain Check that fails.  When the <code>chainId</code> is provided it means the chain is
         * actually supported but it is not currently the selected network.
         */
        chainCheckFailedHandler?: (chainId?: number) => void;

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

    public async validateNetwork(invokeHandlers: boolean = true, chainId?: number): Promise<boolean> {
        const isWalletNotConnected: boolean = await ConfigService.isWalletNotConnected();
        if (isWalletNotConnected) {
            logger.warn('validateNetwork - wallet is not connected');
            if (invokeHandlers) this.config.chain.walletNotConnectedHandler();
            return false;
        }

        if (chainId !== undefined) {
            if (!this.isChainValid(chainId)) {
                logger.warn(
                    `validateNetwork - provided chainId not supported [ ChainId : ${chainId}, SupportedNetworks : ${this.config.chain.supportedChains.toString()} ]`
                );
                if (invokeHandlers) this.config.chain.chainCheckFailedHandler();
                return false;
            } else if (Kriptou.Network.currentNetwork().chainId !== chainId) {
                logger.warn(
                    `validateNetwork - provided chainId is supported but is not equal to current selected network [ ChainId : ${chainId}, CurrentNetwork : ${
                        Kriptou.Network.currentNetwork().chainId
                    }, SupportedNetworks : ${this.config.chain.supportedChains.toString()} ]`
                );
                if (invokeHandlers) this.config.chain.chainCheckFailedHandler(chainId);
                return false;
            }
            // Network is valid
            return true;
        }

        if (!this.isChainValid(Kriptou.Network.currentNetwork().chainId)) {
            logger.warn(
                `validateNetwork - current selected network not supported [ CurrentNetwork : ${
                    Kriptou.Network.currentNetwork().chainId
                }, SupportedNetworks : ${this.config.chain.supportedChains.toString()} ]`
            );
            if (invokeHandlers) this.config.chain.chainCheckFailedHandler();
            return false;
        }
        // Network is valid
        return true;
    }

    private static isWalletNotConnected(): Promise<boolean> {
        // Disable it here and rather fire it in `validateNetwork` function
        return Kriptou.User.currentPromise(false).then((value) => value === undefined);
    }

    private isChainValid(chainId: number | undefined): boolean {
        if (this.config === undefined) {
            return true;
        }

        if (!this.config.chain.performValidation) {
            return true;
        }

        if (chainId === undefined) {
            logger.warn('isChainValid - chainId === undefined');
            return false;
        }

        return !!this.config.chain.supportedChains.find((value) => value === chainId);
    }
}
