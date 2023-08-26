/** ***********************
 * MIT
 * Copyright (c) 2022 ownft Platform
 **************************/

/**
 * The CAIP-2 representation of a blockchain/network.
 *
 * Reference:  https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md
 */
export interface KriptouNetworkInternal {
    name: string;
    shortName: string;
    chain: string;
    chainId: number;
    networkId: number;
    rpc: Array<string>;
    faucets: Array<string>;
    infoURL: string;
    nativeCurrency: NetworkNativeCurrency;
    /** Deprecated, will be removed in the future */
    network?: string;
    parent?: NetworkParent;
    explorers?: Array<BlockExplorer>;
    title?: string;
    ens?: EthereumNameService;
}

export type EthereumNameService = {
    registry: string;
};

export type NetworkParent = {
    type: string;
    chain: string;
    bridges?: Array<NetworkBridge>;
};

export type NetworkBridge = {
    url: string;
};

export type BlockExplorer = {
    name: string;
    url: string;
    standard: BlockExplorerStandard;
};

export type NetworkNativeCurrency = {
    name: string;
    symbol: string;
    decimals: number;
};

export enum BlockExplorerStandard {
    Eip3091 = 'EIP3091',
    None = 'none'
}
