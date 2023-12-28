/** ***********************
 * MIT
 * Copyright (c) 2022 ownft Platform
 **************************/

import { AccountService, KriptouUserInternal } from './account/account.service';
import { StatusService } from './status/status.service';
import { KriptouSignTypeInternal, Web3Service } from './web3/web3.service';
import { PluginsService } from './plugin/plugins.service';
import { KriptouNftInternal } from './plugin/nft/nft-plugin.service';
import { ContractService, KriptouContractMethodInvocationOptionsInternal } from './contract/contract.service';
import { ConfigService, KriptouConfigInternal } from './config/config.service';
import { LogTypes, logUtil } from './util/log-util';
import { EventService, KriptouEventInternal, KriptouSubscriptionInternal } from './event/event.service';
import { KriptouNetworkInternal, networks, NetworkService } from './network';
import { BrowserProvider } from 'ethers';

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

    export const events = KriptouEventInternal;
    export const supportedNetworks = networks;
    export const signTypes = KriptouSignTypeInternal;

    /**
     * Initialises the environment.
     */
    export const init = (_config?: Kriptou.Types.Config): void => {
        logger.debug('init - init');

        if (network === undefined) network = new Network();
        if (config === undefined) config = new Config(_config);
        if (status === undefined) status = new Status(config);
        if (web3 === undefined) web3 = new Web3(status, network, config);
        if (account === undefined) account = new Account(status, web3, _config);
        if (plugins === undefined) plugins = new Plugins();
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
        /**
         * <p>
         * Returns array of accounts.
         *
         * <p>
         * If the wallet is locked this should open it to be unlocked.
         */
        public static authenticate(): Promise<Array<string>> {
            return web3.connectWallet();
        }

        public static provider(): BrowserProvider {
            return globalThis.provider;
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
        public static currentPromise(
            performWalletNotConnectedHandler: boolean = true,
            performCheckWeb3NotSupportedStatus: boolean = false
        ): Promise<Kriptou.Types.User | undefined> {
            logger.debug('User :: currentPromise - user:', user);

            if (performCheckWeb3NotSupportedStatus) status.checkWeb3NotSupportedStatus();

            if (account) return account.getUser(performWalletNotConnectedHandler);

            logger.error('User::currentPromise account is not defined:', account);
            return Promise.resolve(undefined);
        }
        public static currentWithBalancePromise(): Promise<Kriptou.Types.User | undefined> {
            logger.debug('User :: currentWithBalancePromise - user:', user);

            if (account) return account.getUserBalance();

            logger.error('User::currentWithBalancePromise account is not defined:', account);
            return Promise.resolve(undefined);
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
    }

    export class Network extends NetworkService {
        public static currentNetwork(): Kriptou.Types.Network | undefined {
            return network.network;
        }

        /**
         * <p>
         * When no <code>chainId</code> argument provided:
         * <p>
         * Returns whether the current selected network is valid (ie. configured with the <code>Kriptou.init</code> setup)
         * and also executes a lambda based on the library's configuration.
         *
         * <p>
         * When <code>chainId</code> argument provided:
         * <p>
         * Returns whether the provided network is valid (ie. configured with the <code>Kriptou.init</code> setup) and
         * is also equals to the current selected network and also executes a lambda based on the library's configuration.
         */
        public static validateNetwork(chainId?: number): Promise<boolean> {
            return config.validateNetwork(true, chainId);
        }

        /**
         * <p>
         * Switches to a specific network.
         *
         * <p>
         * Returns a <code>Promise</code> with the outcome.
         */
        public static switchNetwork(chainId: number): Promise<void> {
            return network.switch(chainId);
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
