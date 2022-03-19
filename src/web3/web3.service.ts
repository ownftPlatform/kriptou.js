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

const web3 = require('web3');

declare let require: any;
declare let window: any;

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
        ethereum.on('accountsChanged', (_accounts: any) => {
            // Handle the new accounts, or lack thereof.
            // "accounts" will always be an array, but it can be empty.
            logger.debug('setupEvents - accountsChanged');
            window.location.reload();
        });

        ethereum.on('chainChanged', (chainId: any) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            // window.location.reload();
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
}
