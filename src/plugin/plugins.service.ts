import { NftPluginService } from './nft-plugin.service';

export class PluginsService {
    constructor() {
        console.log('PluginsService :: ctor');
    }

    static nft: NftPluginService = new NftPluginService();
}
