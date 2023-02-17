/** ***********************
 * MIT
 * Copyright (c) 2022 OwNFT Market
 **************************/

import { BehaviorSubject } from 'rxjs';
import * as Web3Utils from 'web3-utils';
import { StatusValue } from '../status/status.service';
import { Web3Service } from '../web3/web3.service';
import { Kriptou } from '../index';
import { logUtil } from '../util/log-util';
import { AccountsNotFoundError } from './error';

export interface KriptouUserInternal {
    address?: string;
    balanceWei?: string;
    balanceEth?: number;
}

declare let window: any;

const logger = logUtil.getLogger('AccountService');

export class AccountService {
    public user: Kriptou.Types.User;

    private rxAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

    private readonly web3Service: Web3Service;
    private account: string; // Wallet address
    private blockchain: any;

    // eslint-disable-next-line max-lines-per-function
    constructor(private status: Kriptou.Status, web3: Kriptou.Web3, private config?: Kriptou.Types.Config) {
        logger.debug('ctor');
        this.web3Service = web3;
        this.web3Service.rxWeb3.subscribe((result: any) => {
            this.blockchain = result[2];
            this.getAccount()
                .then((retAccount: string) => {
                    this.user = {
                        address: retAccount,
                        balanceWei: '0',
                        balanceEth: parseInt(Web3Utils.fromWei('0'), 10)
                    };

                    window.userAddress = this.user.address;

                    this.status.updateStatus(StatusValue.ReadyAndUserConnected, this.user);
                    this.rxAccount.next(retAccount);
                })
                .catch((error) => {
                    if (error instanceof AccountsNotFoundError) {
                        logger.warn(error.message);
                        return;
                    }
                    logger.error(error);
                });
        });
    }

    public getUser(performWalletNotConnectedHandler: boolean = true): Promise<Kriptou.Types.User> {
        return new Promise((resolve, reject) => {
            this.status.addStatusUpdatedSubscription(undefined, (status: { status: StatusValue; user: any }) => {
                switch (status.status) {
                    case StatusValue.NotReady: {
                        logger.debug('getUser - Do not do anything for StatusValue.NotReady');
                        break;
                    }
                    case StatusValue.ReadyAndUserConnected: {
                        logger.debug('getUser - StatusValue.ReadyAndUserConnected');
                        return resolve(status.user);
                    }
                    case StatusValue.NoAccountsFound: {
                        logger.debug('getUser - StatusValue.NoAccountsFound');
                        if (
                            this.config !== undefined &&
                            this.config.chain !== undefined &&
                            this.config.chain.walletNotConnectedHandler !== undefined &&
                            performWalletNotConnectedHandler
                        ) {
                            this.config.chain.walletNotConnectedHandler();
                        }
                        return resolve(undefined);
                    }
                    case StatusValue.Web3NotSupported: {
                        logger.debug('getUser - StatusValue.Web3NotSupported');
                        return resolve(undefined);
                    }
                    default: {
                        logger.error('getUser - We should not get here: ', status.status);
                        return reject(new Error('We should not get here??' + status.status));
                    }
                }
            });
        });
    }

    public async getUserBalance(): Promise<Kriptou.Types.User> {
        const account = await this.getAccount();
        logger.debug('getUserBalance - account:', account);
        return new Promise((resolve, reject) => {
            this.blockchain.getBalance(account, (err: any, balance: any) => {
                logger.debug('getUserBalance - balance:', balance);
                if (!err) {
                    // Update the in-memory user object as well with the latest balance
                    this.user = {
                        address: account,
                        balanceWei: balance,
                        balanceEth: parseInt(Web3Utils.fromWei(balance), 10)
                    };

                    logger.info('getUserBalance :: getBalance - this.user:', this.user);
                    resolve(this.user);
                } else {
                    reject(new Error("{ account: 'error', balance: 0 }"));
                }
            });
        });
    }

    private async getAccount(): Promise<string> {
        logger.debug('getAccount - init');
        if (this.account == null) {
            return new Promise((resolve, reject) => {
                logger.debug('getAccount - this.blockchain:', this.blockchain);
                this.blockchain.getAccounts((err: any, retAccounts: Array<string>) => {
                    logger.info('getAccount - retAccounts:', retAccounts);
                    if (retAccounts.length > 0) {
                        this.account = retAccounts[0];

                        resolve(this.account);
                    } else {
                        reject(new AccountsNotFoundError('No accounts found'));
                        this.status.updateStatus(StatusValue.NoAccountsFound);
                    }
                    if (err != null) {
                        globalThis.alert('Account.Service :: getAccount :: error retrieving account');

                        reject(new Error('Error retrieving account'));
                    }
                });
            });
        }
        return Promise.resolve(this.account);
    }
}
