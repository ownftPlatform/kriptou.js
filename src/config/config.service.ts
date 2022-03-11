/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { Kriptou } from '../index';
import { logUtil } from '../util/log-util';

export interface KriptouConfigInternal {
    logger?: {
        level: Kriptou.Types.LogLevels;
    };
    chain: {
        performValidation: boolean;
        delayValidation: boolean;
        supportedChains: Array<number>;
        chainCheckFailedHandler: () => void;
    };
}

const logger = logUtil.getLogger('ConfigService');

export class ConfigService {
    constructor(public readonly config?: Kriptou.Types.Config) {
        if (this.config !== undefined && this.config.logger !== undefined) {
            logUtil.updateLevel(this.config.logger.level);
        }
    }

    public validateNetwork(): boolean {
        if (!this.isCurrentChainValid()) {
            this.config.chain.chainCheckFailedHandler();
            return false;
        }
        return true;
    }

    private isCurrentChainValid(): boolean {
        if (this.config === undefined) {
            return true;
        }

        if (!this.config.chain.performValidation) {
            return true;
        }

        if (Kriptou.Network.currentNetwork() === undefined) {
            logger.warn('isCurrentChainValid - Kriptou.Network.currentNetwork() === undefined');
            return false;
        }

        return !!this.config.chain.supportedChains.find((value) => value === Kriptou.Network.currentNetwork().chainId);
    }
}
