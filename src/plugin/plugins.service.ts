/** ***********************
 * MIT
 * Copyright (c) 2022 ownft Platform
 **************************/

import { NftPluginService } from './nft/nft-plugin.service';

/**
 * Instantiate all plugins here.
 */
export class PluginsService {
    public nft: NftPluginService = new NftPluginService();
}
