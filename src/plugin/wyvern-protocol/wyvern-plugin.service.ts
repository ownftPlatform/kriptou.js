/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

import { logUtil } from '../../util/log-util';
import { Kriptou } from '../../index';
import { WyvernProtocolPredicate } from './predicates';

// eslint-disable-next-line etc/no-commented-out-code
// export enum WyvernProtocolStaticMarket {
//     ERC721ForERC20 = 'ERC721ForERC20',
//     ERC20ForERC721 = 'ERC20ForERC721'
// }

// eslint-disable-next-line etc/no-commented-out-code
// export enum WyvernProtocolStaticUtil {
//     Split = 'Split'
// }

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

    public getSelectorWithExtraData(input: WyvernProtocolPredicate): any {
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
