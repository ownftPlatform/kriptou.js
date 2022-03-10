export interface KriptouNftInternal {
    img: string;
}

export class NftPluginService {
    constructor() {
        console.log('NftPluginService :: ctor');
    }

    async getNFTs(param: { chain: string }) {
        return Promise.resolve([
            { img: 'assets/img/images/hotdog.jpg' }, // 4
            { img: 'assets/img/images/tree.jpg' }, // 0
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
