import { ReplaySubject } from 'rxjs';
import { ethers } from 'ethers';
import { ContractService } from './contract/contract.service';
import { NetworkService } from './network.service';

const Web3 = require('web3');

declare let require: any;
declare let window: any;

export class Web3Service {
    private web3: any;
    private enable: any;
    public rxWeb3: ReplaySubject<any> = new ReplaySubject();

    constructor(private readonly networkService: NetworkService) {
        console.log('Web3Service :: ctor');
        this.initWeb3();
    }

    private initWeb3(): void {
        if (window.ethereum === undefined) {
            alert('Non-Ethereum browser detected. Install MetaMask');
        } else {
            this.setupEvents(window.ethereum);
            if (typeof window.web3 !== 'undefined') {
                this.web3 = window.web3.currentProvider;
            } else {
                this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
            }
            window.web3 = new Web3(window.ethereum);
            window.provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log('this.web3:', this.web3);
            console.log('window.web3:', window.web3);

            // this.enable = this.enableMetaMaskAccount();
            window.web3.eth.getChainId().then((chainId: number) => {
                console.log('Web3.Service :: initWeb3 :: chainId', chainId);
                window.chainId = chainId;
                this.networkService.setChainId(chainId);
                ContractService.blockchain = window.web3.eth;
                this.rxWeb3.next([this.web3, window.web3, window.web3.eth]);
            });
        }
    }

    private async enableMetaMaskAccount(): Promise<any> {
        if (window.ethereum === undefined) {
            alert('Non-Ethereum browser detected. Install MetaMask');
            return;
        }
        console.log('enableMetaMaskAccount - 1');
        let enable = false;
        console.log('enableMetaMaskAccount - 2');
        await new Promise((resolve, reject) => {
            console.log('enableMetaMaskAccount - 3');
            enable = window.ethereum.enable();
            console.log('enableMetaMaskAccount - 4', enable);
        });
        console.log('enableMetaMaskAccount - 5');
        return Promise.resolve(enable);
    }

    private setupEvents(ethereum: any): void {
        ethereum.on('accountsChanged', (accounts: any) => {
            // Handle the new accounts, or lack thereof.
            // "accounts" will always be an array, but it can be empty.
            console.log('setupEvents - accountsChanged');
            window.location.reload();
        });

        ethereum.on('chainChanged', (chainId: any) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            // window.location.reload();
            console.log('setupEvents - chainChanged');
            window.location.reload();
        });

        ethereum.on('connect', (connectInfo: any) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            console.log('setupEvents - connect');
            // window.location.reload();
        });

        ethereum.on('disconnect', (connectInfo: any) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            console.log('setupEvents - disconnect');
            // window.location.reload();
        });
    }

    public connectWallet(): void {
        this.enable = this.enableMetaMaskAccount();
    }
}
