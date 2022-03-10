import { AccountService, KriptouUserInternal } from './account.service';
import { StatusService } from './status.service';
import { Web3Service } from './web3.service';
import { PluginsService } from './plugin/plugins.service';
import { KriptouNftInternal } from './plugin/nft-plugin.service';
import { ContractService, KriptouContractMethodInvocationOptionsInternal } from './contract/contract.service';
import { ethers } from 'ethers';
import { KriptouNetworkInternal, NetworkService, KriptouNetworkTypeInternal } from './network.service';
import { KriptouEventInternal } from './events';
import { ConfigService, KriptouConfigInternal } from './config/config.service';

export namespace Kriptou {
    export namespace Types {
        export type ContractMethodInvocationOptions = KriptouContractMethodInvocationOptionsInternal;
        export type NFt = KriptouNftInternal;
        export type User = KriptouUserInternal;
        export type Network = KriptouNetworkInternal;
        export type Config = KriptouConfigInternal;
    }

    // Exporting 'ethers' project's utils
    export const utils = ethers.utils;

    export const events = KriptouEventInternal;
    export const supportedNetworks = KriptouNetworkTypeInternal;

    /**
     * Initialises the environment.
     */
    export function init(_config?: Kriptou.Types.Config): void {
        console.log('Kriptou :: init :: start');

        if (plugins === undefined) plugins = new Plugins();
        if (status === undefined) status = new Status();
        if (network === undefined) network = new Network();
        if (web3API === undefined) web3API = new Web3API(network);
        if (account === undefined) account = new Account(status, web3API);
        if (config === undefined) config = new Config(_config);

        console.log('Kriptou :: init :: done');
    }

    export function invokeContractMethod(options: Kriptou.Types.ContractMethodInvocationOptions): Promise<any> {
        return Contract.invokeContractMethod(options, User.current());
    }

    export function subscribe(
        subscription: { listener: string; events: Array<KriptouEventInternal> },
        fn: (...args: any) => any
    ): void {
        console.log('Kriptou :: subscribe :: subscription', subscription);
        subscription.events.forEach((event: KriptouEventInternal) => {
            if (event === KriptouEventInternal.StatusUpdated) {
                status.addSubscription(subscription, fn);
            }
            if (event === KriptouEventInternal.UserLoggedIn) {
                status.addUserLoggedInSubscription(subscription, fn);
            }
            if (event === KriptouEventInternal.NetworkUpdated) {
                network.addNetworkUpdatedSubscription(subscription, fn);
            }
        });
    }

    export class Web3API extends Web3Service {
        static authenticate() {
            web3API.connectWallet();
        }
    }

    export class Account extends AccountService {
        static current() {
            return account;
        }
    }

    export class User implements Types.User {
        static current(): Types.User {
            console.log('User :: current', user);
            return user;
        }
        static set(_user: any) {
            console.log('User :: set');
            user = _user;
        }
    }

    export class Status extends StatusService {
        static current(): Status {
            return status;
        }
    }

    export class Plugins extends PluginsService {}

    export class Network extends NetworkService {
        static currentNetwork(): Types.Network | undefined {
            return network.network;
        }

        /**
         * Returns whether the current selected network is valid and also executes a lambda based on the library's configuration.
         */
        static validateNetwork(): boolean {
            return config.validateNetwork();
        }
    }

    export class Config extends ConfigService {
        static current(): Config {
            return config;
        }
        static currentConfig(): Types.Config {
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
