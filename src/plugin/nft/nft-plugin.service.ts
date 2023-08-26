/** ***********************
 * MIT
 * Copyright (c) 2022 ownft Platform
 **************************/

import { logUtil } from '../../util/log-util';

export interface KriptouNftInternal {
    img: string;
}

const logger = logUtil.getLogger('NftPluginService');

export class NftPluginService {
    constructor() {
        logger.debug('ctor');
    }

    public async getNFTs(_param: { chain: string }) {
        return Promise.resolve([
            // eslint-disable-next-line sonarjs/no-duplicate-string
            { img: 'assets/img/images/hotdog.jpg' }, // 4
            // eslint-disable-next-line sonarjs/no-duplicate-string
            { img: 'assets/img/images/tree.jpg' }, // 0
            // eslint-disable-next-line sonarjs/no-duplicate-string
            { img: 'assets/img/images/birds.jpg' }, // 3
            { img: 'assets/img/images/tree.jpg' }, // 1
            { img: 'assets/img/images/birds.jpg' }, // 3
            { img: 'assets/img/images/hotdog.jpg' }, // 4
            { img: 'assets/img/images/tree.jpg' }, // 2
            { img: 'assets/img/images/birds.jpg' }, // 3
            { img: 'assets/img/images/hotdog.jpg' }, // 4
            { img: 'assets/img/images/tree.jpg' }, // 2
            { img: 'assets/img/images/birds.jpg' }, // 3
            { img: 'assets/img/images/hotdog.jpg' }, // 4
            { img: 'assets/img/images/tree.jpg' }, // 2
            { img: 'assets/img/images/birds.jpg' }, // 3
            { img: 'assets/img/images/hotdog.jpg' }, // 4
            { img: 'assets/img/images/tree.jpg' }, // 2
            { img: 'assets/img/images/birds.jpg' }, // 3
            { img: 'assets/img/images/hotdog.jpg' }, // 4
            { img: 'assets/img/images/tree.jpg' }, // 2
            { img: 'assets/img/images/birds.jpg' }, // 3
            { img: 'assets/img/images/hotdog.jpg' } // 4
        ]);
    }
}
