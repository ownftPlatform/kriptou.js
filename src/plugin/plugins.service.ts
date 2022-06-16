/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { NftPluginService } from './nft/nft-plugin.service';
import { WyvernPluginService } from './wyvern-protocol/wyvern-plugin.service';
import { logUtil } from '../util/log-util';
import { Kriptou } from '../index';

const logger = logUtil.getLogger('PluginsService');

/**
 * Instantiate all plugins here.
 */
export class PluginsService {
    public nft: NftPluginService = new NftPluginService();
    public wyvern: WyvernPluginService;

    constructor(config?: Kriptou.Types.Config) {
        logger.debug('ctor');
        this.wyvern = new WyvernPluginService(config);
    }
}
