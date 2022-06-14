/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { ReplaySubject } from 'rxjs';
import { ethers } from 'ethers';
import { ContractService } from '../contract/contract.service';
import { NetworkService } from '../network/network.service';
import { logUtil } from '../util/log-util';
import { ConfigService } from '../config/config.service';
import { Kriptou } from '../index';

const web3 = require('web3');

declare let require: any;
declare let window: any;

export enum KriptouSignTypeInternal {
    EthSign,
    PersonalSign,
    SignTypedData,
    SignTypedDataV1,
    SignTypedDataV3,
    SignTypedDataV4
}

const logger = logUtil.getLogger('Web3Service');

export class Web3Service {
    private web3: any;
    private enable: any;
    public rxWeb3: ReplaySubject<any> = new ReplaySubject();

    constructor(private readonly networkService: NetworkService, private configService?: ConfigService) {
        logger.debug('ctor');
        this.initWeb3();
    }

    private initWeb3(): void {
        if (window.ethereum === undefined) {
            window.alert('Non-Ethereum browser detected. Install MetaMask');
        } else {
            this.setupEvents(window.ethereum);
            this.web3 =
                typeof window.web3 !== 'undefined'
                    ? window.web3.currentProvider
                    : new web3.providers.HttpProvider('http://localhost:8545');
            window.web3 = new web3(window.ethereum);
            window.provider = new ethers.providers.Web3Provider(window.ethereum);
            logger.debug('this.web3:', this.web3);
            logger.debug('window.web3:', window.web3);

            window.web3.eth.getChainId().then((chainId: number) => {
                logger.info('initWeb3 - chainId:', chainId);
                window.chainId = chainId;
                this.networkService.setChainIdDecimal(chainId);
                ContractService.BLOCKCHAIN = window.web3.eth;
                this.rxWeb3.next([this.web3, window.web3, window.web3.eth]);
            });
        }
    }

    private async enableMetaMaskAccount(): Promise<any> {
        if (window.ethereum === undefined) {
            window.alert('Non-Ethereum browser detected. Install MetaMask');
            return;
        }
        let enable = false;
        await new Promise((_resolve, _reject) => {
            enable = window.ethereum.enable();
        });
        return Promise.resolve(enable);
    }

    private setupEvents(ethereum: any): void {
        ethereum.on('accountsChanged', (accounts: Array<string>) => {
            // Handle the new accounts, or lack thereof.
            // "accounts" will always be an array, but it can be empty.
            logger.debug('setupEvents - accountsChanged');
            if (this.configService.isAccountsChangeReloadEnabled) {
                window.location.reload();
            } else {
                if (this.configService.config.accounts.changeHandler) {
                    this.configService.config.accounts.changeHandler(accounts);
                }
            }
        });

        ethereum.on('chainChanged', (chainId: any) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            logger.debug('setupEvents - chainChanged');
            this.networkService.setChainIdHex(chainId);
            if (this.configService.isNetworkChangeReloadEnabled) {
                window.location.reload();
            }
        });

        ethereum.on('connect', (_connectInfo: any) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            logger.debug('setupEvents - connect');
        });

        ethereum.on('disconnect', (_connectInfo: any) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            logger.debug('setupEvents - disconnect');
        });
    }

    public connectWallet(): void {
        this.enable = this.enableMetaMaskAccount();
    }

    /**
     * <p>
     * Personal sign.
     */
    public sign(data: any, type: Kriptou.Types.SignType): Promise<any> {
        switch (type) {
            case KriptouSignTypeInternal.PersonalSign:
                return window.web3.eth.personal.sign(data, Kriptou.User.current().address, '');
            case KriptouSignTypeInternal.SignTypedDataV3:
                return window.ethereum.request({
                    method: 'eth_signTypedData_v3',
                    params: [Kriptou.User.current().address, JSON.stringify(data)]
                });
            case KriptouSignTypeInternal.EthSign: {
                throw new Error('Not implemented yet: EthSign case');
            }
            case KriptouSignTypeInternal.SignTypedData: {
                throw new Error('Not implemented yet: SignTypedData case');
            }
            case KriptouSignTypeInternal.SignTypedDataV1: {
                throw new Error('Not implemented yet: SignTypedDataV1 case');
            }
            case KriptouSignTypeInternal.SignTypedDataV4: {
                throw new Error('Not implemented yet: SignTypedDataV4 case');
            }
        }
    }

    /**
     * <p>
     * When <code>address</code> is specified then it will be used to compare to the <code>recoveredAddress</code>,
     * otherwise the loggedIn user's address is used for the comparison.
     */
    public verifySigner(data: any, signature: any, address?: string): Promise<boolean> {
        return this.getSigner(data, signature).then((recoveredAddress: any) => {
            if (address !== undefined) return address.toLowerCase() === recoveredAddress.toLowerCase();
            return Kriptou.User.current().address.toLowerCase() === recoveredAddress.toLowerCase();
        });
    }

    public getSigner(data: any, signature: any): Promise<string> {
        return window.web3.eth.personal.ecRecover(data, signature);
    }
}
