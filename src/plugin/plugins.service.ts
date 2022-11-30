/** ***********************
 * MIT
 * Copyright (c) 2022 OwNFT Market
 **************************/

import { NftPluginService } from './nft/nft-plugin.service';

/**
 * Instantiate all plugins here.
 */
export class PluginsService {
    public nft: NftPluginService = new NftPluginService();
}
