/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { NftPluginService } from './nft-plugin.service';
import { logUtil } from '../util/log-util';

const logger = logUtil.getLogger('PluginsService');

export class PluginsService {
    constructor() {
        logger.debug('ctor');
    }

    public static NFT: NftPluginService = new NftPluginService();
}
