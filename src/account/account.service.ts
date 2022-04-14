/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
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
    private account: any;
    private blockchain: any;

    constructor(private status: Kriptou.Status, web3: Kriptou.Web3, private config?: Kriptou.Types.Config) {
        logger.debug('ctor');
        this.web3Service = web3;
        this.web3Service.rxWeb3.subscribe((result: any) => {
            this.blockchain = result[2];
            this.getUserBalance()
                .then((retAccount: any) => {
                    this.user = {
                        address: retAccount.account,
                        balanceWei: retAccount.balance,
                        balanceEth: parseInt(Web3Utils.fromWei(retAccount.balance), 10)
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

    public connectWallet(): void {
        this.web3Service.connectWallet();
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
                        return resolve(status.user);
                    }
                    case StatusValue.NoAccountsFound: {
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
                    default: {
                        return reject(new Error('We should not get here??' + status.status));
                    }
                }
            });
        });
    }

    private async getUserBalance(): Promise<any> {
        const account = await this.getAccount();
        logger.debug('getUserBalance - account:', account);
        return new Promise((resolve, reject) => {
            this.blockchain.getBalance(account, (err: any, balance: any) => {
                logger.debug('getUserBalance - balance:', balance);
                if (!err) {
                    const retVal = {
                        account,
                        balance
                    };
                    logger.info('getUserBalance :: getBalance - retVal:', retVal);
                    resolve(retVal);
                } else {
                    reject(new Error("{ account: 'error', balance: 0 }"));
                }
            });
        });
    }

    private async getAccount(): Promise<any> {
        logger.debug('getAccount - init');
        if (this.account == null) {
            this.account = (await new Promise((resolve, reject) => {
                logger.debug('getAccount - this.blockchain:', this.blockchain);
                // eslint-disable-next-line etc/no-commented-out-code
                // this.status.updateStatus(StatusValue.ReadyAndUserNotConnected, this.user);
                this.blockchain.getAccounts((err: any, retAccounts: any) => {
                    logger.info('getAccount - retAccounts:', retAccounts);
                    if (retAccounts.length > 0) {
                        this.account = retAccounts[0];

                        resolve(this.account);
                    } else {
                        reject(new AccountsNotFoundError('No accounts found'));
                        this.status.updateStatus(StatusValue.NoAccountsFound);
                    }
                    if (err != null) {
                        window.alert('Account.Service :: getAccount :: error retrieving account');

                        reject(new Error('Error retrieving account'));
                    }
                });
            })) as Promise<any>;
        }
        return Promise.resolve(this.account);
    }
}
