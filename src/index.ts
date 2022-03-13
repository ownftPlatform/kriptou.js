/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { AccountService, KriptouUserInternal } from './account/account.service';
import { StatusService } from './status/status.service';
import { Web3Service } from './web3/web3.service';
import { PluginsService } from './plugin/plugins.service';
import { KriptouNftInternal } from './plugin/nft-plugin.service';
import { ContractService, KriptouContractMethodInvocationOptionsInternal } from './contract/contract.service';
import { ethers } from 'ethers';
import { KriptouNetworkInternal, NetworkService, KriptouNetworkTypeInternal } from './network/network.service';
import { KriptouEventInternal } from './events';
import { ConfigService, KriptouConfigInternal } from './config/config.service';
import { LogTypes, logUtil } from './util/log-util';

const logger = logUtil.getLogger('Kriptou');

export namespace Kriptou {
    export namespace Types {
        export type ContractMethodInvocationOptions = KriptouContractMethodInvocationOptionsInternal;
        export type NFt = KriptouNftInternal;
        export type User = KriptouUserInternal;
        export type Network = KriptouNetworkInternal;
        export type Config = KriptouConfigInternal;
        export type LogLevels = LogTypes;
    }

    // Exporting 'ethers' project's utils
    export const utils = ethers.utils;

    export const events = KriptouEventInternal;
    export const supportedNetworks = KriptouNetworkTypeInternal;

    /**
     * Initialises the environment.
     */
    export const init = (_config?: Kriptou.Types.Config): void => {
        logger.debug('init - init');

        if (plugins === undefined) plugins = new Plugins();
        if (status === undefined) status = new Status();
        if (network === undefined) network = new Network();
        if (web3API === undefined) web3API = new Web3API(network);
        if (config === undefined) config = new Config(_config);
        if (account === undefined) account = new Account(status, web3API, _config);

        logger.debug('init - done');
    };

    export const invokeContractMethod = (options: Kriptou.Types.ContractMethodInvocationOptions): Promise<any> => {
        return Contract.invokeContractMethod(options, User.current());
    };

    export const subscribe = (
        subscription: { listener: string; events: Array<KriptouEventInternal> },
        fn: (...args: any) => any
    ): void => {
        logger.debug('subscribe - subscription:', subscription);
        subscription.events.forEach((event: KriptouEventInternal) => {
            if (event === KriptouEventInternal.StatusUpdated) {
                status.addStatusUpdatedSubscription(subscription, fn);
            }
            if (event === KriptouEventInternal.UserLoggedIn) {
                status.addUserLoggedInSubscription(subscription, fn);
            }
            if (event === KriptouEventInternal.NetworkUpdated) {
                network.addNetworkUpdatedSubscription(subscription, fn);
            }
        });
    };

    export class Web3API extends Web3Service {
        public static authenticate() {
            web3API.connectWallet();
        }
    }

    export class Account extends AccountService {
        private static current() {
            return account;
        }
    }

    export class User implements Types.User {
        public static current(): Types.User {
            logger.debug('User :: current - user:', user);
            return user;
        }
        public static currentPromise(performWalletNotConnectedHandler: boolean = true): Promise<Types.User> {
            logger.debug('User :: currentPromise - user:', user);
            return account.getUser(performWalletNotConnectedHandler);
        }
        public static set(_user: any) {
            logger.debug('User :: set - user:', _user);
            user = _user;
        }
    }

    export class Status extends StatusService {
        public static current(): Status {
            return status;
        }
    }

    export class Plugins extends PluginsService {}

    export class Network extends NetworkService {
        public static currentNetwork(): Types.Network | undefined {
            return network.network;
        }

        /**
         * Returns whether the current selected network is valid and also executes a lambda based on the library's configuration.
         */
        public static validateNetwork(): Promise<boolean> {
            return config.validateNetwork();
        }

        public static switchNetwork(): void {
            network.switch().then(() => logger.debug('switchNetwork - done'));
        }
    }

    export class Config extends ConfigService {
        public static current(): Config {
            return config;
        }
        private currentConfig(): Types.Config {
            return config.config;
        }
    }

    let user: User;
    let status: Status;
    let network: Network;
    let web3API: Web3API;
    let account: Account;
    let plugins: Plugins;
    let config: Config;

    export class Contract extends ContractService {}
}
