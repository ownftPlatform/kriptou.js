import { Kriptou } from '../index';

export interface KriptouConfigInternal {
    chain: {
        performValidation: boolean;
        delayValidation: boolean;
        supportedChains: Array<number>;
        chainCheckFailedHandler: () => void;
    };
}

export class ConfigService {
    constructor(public readonly config?: Kriptou.Types.Config) {
        console.log('ConfigService :: ctor');
    }

    public validateNetwork(): boolean {
        if (!this.isCurrentChainValid()) {
            this.config.chain.chainCheckFailedHandler();
            return false;
        }
        return true;
    }

    private isCurrentChainValid(): boolean {
        console.log('ConfigService :: isCurrentChainValid - 1');
        if (this.config === undefined) {
            console.log('ConfigService :: isCurrentChainValid - 2');
            return true;
        }

        console.log('ConfigService :: isCurrentChainValid - 3');
        if (!this.config.chain.performValidation) {
            console.log('ConfigService :: isCurrentChainValid - 4');
            return true;
        }

        console.log('ConfigService :: isCurrentChainValid - 5');
        if (Kriptou.Network.currentNetwork() === undefined) {
            console.log('ConfigService :: isCurrentChainValid - Kriptou.Network.currentNetwork() === undefined');
            return false;
        }
        console.log('ConfigService :: isCurrentChainValid - 6');

        return !!this.config.chain.supportedChains.find((value) => value === Kriptou.Network.currentNetwork().chainId);
    }
}
