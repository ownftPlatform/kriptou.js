/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { AccountService, KriptouUserInternal } from './account/account.service';
import { StatusService } from './status/status.service';
import { KriptouSignTypeInternal, Web3Service } from './web3/web3.service';
import { PluginsService } from './plugin/plugins.service';
import { KriptouNftInternal } from './plugin/nft-plugin.service';
import { ContractService, KriptouContractMethodInvocationOptionsInternal } from './contract/contract.service';
import { ethers } from 'ethers';
import { KriptouNetworkInternal, KriptouNetworkTypeInternal, NetworkService } from './network/network.service';
import { ConfigService, KriptouConfigInternal } from './config/config.service';
import { LogTypes, logUtil } from './util/log-util';
import { EventService, KriptouEventInternal, KriptouSubscriptionInternal } from './event/event.service';

const logger = logUtil.getLogger('Kriptou');

export namespace Kriptou {
    export namespace Types {
        export type ContractMethodInvocationOptions = KriptouContractMethodInvocationOptionsInternal;
        export type NFt = KriptouNftInternal;
        export type User = KriptouUserInternal;
        export type Network = KriptouNetworkInternal;
        export type Config = KriptouConfigInternal;
        export type LogLevels = LogTypes;
        export type Subscription = KriptouSubscriptionInternal;
        export type SignType = KriptouSignTypeInternal;
    }

    // Exporting 'ethers' project's utils
    export const utils = ethers.utils;

    export const events = KriptouEventInternal;
    export const supportedNetworks = KriptouNetworkTypeInternal;
    export const signTypes = KriptouSignTypeInternal;

    /**
     * Initialises the environment.
     */
    export const init = (_config?: Kriptou.Types.Config): void => {
        logger.debug('init - init');

        if (status === undefined) status = new Status();
        if (network === undefined) network = new Network();
        if (config === undefined) config = new Config(_config);
        if (web3 === undefined) web3 = new Web3(network, config);
        if (account === undefined) account = new Account(status, web3, _config);
        if (plugins === undefined) plugins = new Plugins(_config);
        if (_events === undefined) _events = new Events(status, network);

        logger.debug('init - done');
    };

    export const invokeContractMethod = (options: Kriptou.Types.ContractMethodInvocationOptions): Promise<any> => {
        return Contract.invokeContractMethod(options, User.current());
    };

    export class Events extends EventService {
        public static subscribe(
            subscription: { listener: string; event: KriptouEventInternal },
            fn: (...args: any) => any
        ): Kriptou.Types.Subscription {
            return _events.subscribe(subscription, fn);
        }
    }

    export namespace Signature {
        /**
         * <p>
         * Performs a sign.  When no <code>type</code> is specified it will assume <code>PersonalSign</code> by default.
         */
        export const sign = (data: any, type: Kriptou.Types.SignType = KriptouSignTypeInternal.PersonalSign): Promise<any> => {
            return web3.sign(data, type);
        };

        /**
         * <p>
         * When <code>address</code> is specified then it will be used to compare to the <code>recoveredAddress</code>,
         * otherwise the loggedIn user's address is used for the comparison.
         */
        export const verifySigner = (data: any, signature: any, address?: string): Promise<boolean> => {
            return web3.verifySigner(data, signature, address);
        };

        export const getSigner = (data: any, signature: any): Promise<string> => {
            return web3.getSigner(data, signature);
        };
    }

    export class Web3 extends Web3Service {
        public static authenticate() {
            web3.connectWallet();
        }
    }

    export class Account extends AccountService {
        private static current() {
            return account;
        }
    }

    export class User implements Kriptou.Types.User {
        public static current(): Kriptou.Types.User {
            logger.debug('User :: current - user:', user);
            return user;
        }
        public static currentPromise(performWalletNotConnectedHandler: boolean = true): Promise<Kriptou.Types.User> {
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

    export class Plugins extends PluginsService {
        // Need to make new plugins statically available here
        public static nft() {
            return plugins.nft;
        }

        public static wyvern() {
            return plugins.wyvern;
        }
    }

    export class Network extends NetworkService {
        public static currentNetwork(): Kriptou.Types.Network | undefined {
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
        public static enableNetworkChangeReload(): void {
            config.enableNetworkChangeReload();
        }
        public static disableNetworkChangeReload(): void {
            config.disableNetworkChangeReload();
        }
    }

    let user: User;
    let status: Status;
    let network: Network;
    let web3: Web3;
    let account: Account;
    let plugins: Plugins;
    let config: Config;
    let _events: Events;

    export class Contract extends ContractService {}
}
