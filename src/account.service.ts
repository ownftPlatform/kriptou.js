import { BehaviorSubject } from 'rxjs';
import * as Web3Utils from 'web3-utils';
import { StatusValue } from './status.service';
import { Web3Service } from './web3.service';
import { Kriptou } from './index';

// enum AccountStatus {
//     NotInitialised,
//     NoAccountsFound,
//     AccountsFound,
//     ErrorRetrievingAccounts
// }

export interface KriptouUserInternal {
    address?: string;
    balanceWei?: string;
    balanceEth?: number;
}

declare let window: any;

export class AccountService {
    public user: Kriptou.Types.User;

    private rxAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);
    // public status: AccountStatus = AccountStatus.NotInitialised;

    // public get walletInitialised(): boolean {
    //     return this.status !== AccountStatus.NotInitialised && this.status !== AccountStatus.ErrorRetrievingAccounts;
    // }
    //
    // public get walletConnected(): boolean {
    //     return this.status === AccountStatus.AccountsFound;
    // }

    private readonly web3Service: Web3Service;
    private account: any;
    private blockchain: any;

    constructor(private status: Kriptou.Status, web3API: Kriptou.Web3API) {
        console.log('AccountService :: ctor');
        this.web3Service = web3API;
        this.web3Service.rxWeb3.subscribe((result: any) => {
            this.blockchain = result[2];
            this.getUserBalance()
                .then((retAccount: any) => {
                    this.user = {
                        address: retAccount.account,
                        balanceWei: retAccount.balance,
                        balanceEth: parseInt(Web3Utils.fromWei(retAccount.balance), 10)
                    };
                    // this.user.address = retAccount.account;
                    window.userAddress = this.user.address;
                    // this.user.balanceWei = retAccount.balance;
                    // this.user.balanceEth = parseInt(Web3Utils.fromWei(retAccount.balance), 10);
                    this.status.updateStatus(StatusValue.ReadyAndUserConnected, this.user);
                    this.rxAccount.next(retAccount);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    private async getAccount(): Promise<any> {
        console.log('Account.Service :: getAccount :: start');
        if (this.account == null) {
            this.account = (await new Promise((resolve, reject) => {
                console.log('Account.Service :: getAccount :: this.blockchain', this.blockchain);
                this.status.updateStatus(StatusValue.ReadyAndUserNotConnected, this.user);
                this.blockchain.getAccounts((err: any, retAccounts: any) => {
                    console.log('Account.Service :: getAccount: retAccounts', retAccounts);
                    if (retAccounts.length > 0) {
                        this.account = retAccounts[0];
                        // this.status = AccountStatus.AccountsFound;
                        // this.status.updateStatus(StatusValue.ReadyAndUserConnected);
                        resolve(this.account);
                    } else {
                        // alert('Account.Service :: getAccount :: no accounts found.');
                        // this.status = AccountStatus.NoAccountsFound;
                        reject('No accounts found.');
                    }
                    if (err != null) {
                        alert('Account.Service :: getAccount :: error retrieving account');
                        // this.status = AccountStatus.ErrorRetrievingAccounts;
                        // this.status.updateStatus(StatusValue.ReadyAndUserConnected);
                        reject('Error retrieving account');
                    }
                });
            })) as Promise<any>;
        }
        return Promise.resolve(this.account);
    }

    private async getUserBalance(): Promise<any> {
        const account = await this.getAccount();
        console.log('Account.Service :: getUserBalance :: account');
        console.log(account);
        return new Promise((resolve, reject) => {
            this.blockchain.getBalance(account, (err: any, balance: any) => {
                console.log('Account.Service :: getUserBalance :: getBalance');
                console.log(balance);
                if (!err) {
                    const retVal = {
                        account,
                        balance
                    };
                    console.log('Account.Service :: getUserBalance :: getBalance :: retVal');
                    console.log(retVal);
                    resolve(retVal);
                } else {
                    reject({ account: 'error', balance: 0 });
                }
            });
        }) as Promise<any>;
    }

    public connectWallet(): void {
        this.web3Service.connectWallet();
    }
}
