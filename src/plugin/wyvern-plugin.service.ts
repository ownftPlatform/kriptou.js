/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { logUtil } from '../util/log-util';
import { Kriptou } from '../index';

// eslint-disable-next-line etc/no-commented-out-code
// export enum WyvernProtocolStaticMarket {
//     ERC721ForERC20 = 'ERC721ForERC20',
//     ERC20ForERC721 = 'ERC20ForERC721'
// }

// eslint-disable-next-line etc/no-commented-out-code
// export enum WyvernProtocolStaticUtil {
//     Split = 'Split'
// }

type Address = any;
type Uint256 = any;
type Bytes = any;
type Bytest4 = any;

export class WyvernProtocolSelectorInput {
    public functionDefinition: string;
    public argumentsTypes: Array<string>;
    public argumentsValues: Array<any>;
}

export class WyvernProtocolSelectorInputTransferERC721Exact extends WyvernProtocolSelectorInput {
    constructor(token: Address, tokenId: Uint256) {
        super();
        this.functionDefinition = 'transferERC721Exact(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address', 'uint256'];
        this.argumentsValues = [token, tokenId];
    }
}

export class WyvernProtocolSelectorInputTransferERC20Exact extends WyvernProtocolSelectorInput {
    constructor(token: Address, amount: Uint256) {
        super();
        this.functionDefinition = 'transferERC20Exact(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address', 'uint256'];
        this.argumentsValues = [token, amount];
    }
}

export class WyvernProtocolSelectorInputSequenceAnyAfter extends WyvernProtocolSelectorInput {
    constructor(addrs: Array<Address>, extradataLengths: Array<Uint256>, selectors: Array<Bytest4>, extradatas: Bytes) {
        super();
        this.functionDefinition = 'sequenceAnyAfter(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address[]', 'uint256[]', 'bytes4[]', 'bytes'];
        this.argumentsValues = [addrs, extradataLengths, selectors, extradatas];
    }
}

export class WyvernProtocolSelectorInputSplit extends WyvernProtocolSelectorInput {
    constructor(targets: Array<Address>, selectors: Array<Bytest4>, firstExtradata: Bytes, secondExtradata: Bytes) {
        super();
        this.functionDefinition = 'split(bytes,address[7],uint8[2],uint256[6],bytes,bytes)';
        this.argumentsTypes = ['address[2]', 'bytes4[2]', 'bytes', 'bytes'];
        this.argumentsValues = [targets, selectors, firstExtradata, secondExtradata];
    }
}

export class WyvernProtocolSelectorInputTransferERC20ExactTo extends WyvernProtocolSelectorInput {
    constructor(token: Address, amount: Uint256, to: Address) {
        super();
        this.functionDefinition = 'transferERC20ExactTo(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address', 'uint256', 'address'];
        this.argumentsValues = [token, amount, to];
    }
}

export class WyvernProtocolSelectorInputSequenceExact extends WyvernProtocolSelectorInput {
    constructor(addrs: Array<Address>, extradataLengths: Array<Uint256>, selectors: Array<Bytest4>, extradatas: Bytes) {
        super();
        this.functionDefinition = 'sequenceExact(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address[]', 'uint256[]', 'bytes4[]', 'bytes'];
        this.argumentsValues = [addrs, extradataLengths, selectors, extradatas];
    }
}

// eslint-disable-next-line etc/no-commented-out-code
// const functionMappings: Record<WyvernProtocolStaticMarket | WyvernProtocolStaticUtil, string> = {
//     [WyvernProtocolStaticMarket.ERC721ForERC20]: 'ERC721ForERC20(bytes,address[7],uint8[2],uint256[6],bytes,bytes)',
//     [WyvernProtocolStaticMarket.ERC20ForERC721]: 'ERC20ForERC721(bytes,address[7],uint8[2],uint256[6],bytes,bytes)',
//
//     [WyvernProtocolStaticUtil.Split]: 'split(bytes,address[7],uint8[2],uint256[6],bytes,bytes)'
// };

const eip712Domain = {
    name: 'EIP712Domain',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
    ]
};

const eip712Order = {
    name: 'Order',
    fields: [
        { name: 'registry', type: 'address' },
        { name: 'maker', type: 'address' },
        { name: 'staticTarget', type: 'address' },
        { name: 'staticSelector', type: 'bytes4' },
        { name: 'staticExtradata', type: 'bytes' },
        { name: 'maximumFill', type: 'uint256' },
        { name: 'listingTime', type: 'uint256' },
        { name: 'expirationTime', type: 'uint256' },
        { name: 'salt', type: 'uint256' }
    ]
};

const logger = logUtil.getLogger('WyvernPluginService');

export class WyvernPluginService {
    constructor(private config?: Kriptou.Types.Config) {
        logger.debug('ctor');
    }

    public getSelectorWithExtraData<T extends WyvernProtocolSelectorInput>(input: T): any {
        return {
            selector: globalThis.web3.eth.abi.encodeFunctionSignature(input.functionDefinition),
            extraData: globalThis.web3.eth.abi.encodeParameters(input.argumentsTypes, input.argumentsValues)
        };
    }

    // public getSelector(functionName: string): string {
    //     return globalThis.web3.eth.abi.encodeFunctionSignature(functionMappings[functionName]);
    // }

    public getMessageToSign(order: any): any {
        const str = this.structToSign(order);
        return {
            types: {
                EIP712Domain: eip712Domain.fields,
                Order: eip712Order.fields
            },
            domain: str.domain,
            primaryType: 'Order',
            message: order
        };
    }

    private structToSign(order: any): any {
        if (
            this.config === undefined ||
            this.config.wyvernProtocol === undefined ||
            this.config.wyvernProtocol.exchangeAddress === undefined ||
            !Kriptou.utils.isAddress(this.config.wyvernProtocol.exchangeAddress)
        ) {
            throw new Error('config.wyvernProtocol.exchangeAddress not specified');
        }

        return {
            name: eip712Order.name,
            fields: eip712Order.fields,
            domain: {
                name: 'Wyvern Exchange',
                version: '3.1',
                chainId: Kriptou.Network.currentNetwork()?.chainId,
                verifyingContract: this.config.wyvernProtocol.exchangeAddress
            },
            data: order
        };
    }
}
