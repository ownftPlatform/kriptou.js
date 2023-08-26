/** ***********************
 * MIT
 * Copyright (c) 2022 ownft Platform
 **************************/

import { getAddress } from '@ethersproject/address';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Contract, PopulatedTransaction } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { Kriptou } from '../index';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { logUtil } from '../util/log-util';

type ContractMethodInvocationParams = Record<string, any>;

export interface KriptouContractMethodInvocationOptionsInternal {
    contractAddress: string;
    functionName: string;
    abi: any;
    params?: ContractMethodInvocationParams;
    msgValue?: BigNumberish;
    printEstimatedGas?: boolean;
    sendCall?: boolean;
}

const logger = logUtil.getLogger('ContractService');

export class ContractService {
    constructor() {
        logger.debug('ctor');
    }

    public static BLOCKCHAIN: any;

    // eslint-disable-next-line max-lines-per-function
    public static async invokeContractMethod(
        options: Kriptou.Types.ContractMethodInvocationOptions,
        user: Kriptou.Types.User
    ): Promise<any> {
        logger.info('invokeContractMethod', options);

        if (!Kriptou.Config.current().validateNetwork()) {
            return;
        }

        // TODO need to check for overloaded functions

        // Assume function is normal
        const functionDataArray = options.abi.filter((x) => x.name === options.functionName);

        if (functionDataArray.length === 0) {
            throw new Error(`Function '${options.functionName}' does not exist in abi`);
        }

        if (functionDataArray.length > 1) {
            const possibleTopics = functionDataArray.map(
                (data) => `${data.name}(${data.inputs.map((input) => input.type).join(',')})`
            );

            throw new Error(
                `Multiple function definitions found in the abi. Please include the topic in the functionName. Possible funcationNames: ${possibleTopics.join(
                    ' ,'
                )}`
            );
        }

        const functionData = functionDataArray[0];
        const stateMutability: string = functionData?.stateMutability;
        const isReadFunction: boolean = stateMutability === 'view' || stateMutability === 'pure';

        const contract: Contract = new Contract(options.contractAddress, options.abi, globalThis.provider);

        const params: Array<any> =
            options.params !== undefined ? Object.entries(options.params).map((a: [string, any]) => a[1]) : [];
        logger.debug('invokeContractMethod - params:', params);

        let result: Promise<any>;
        if (isReadFunction) {
            logger.info('invokeContractMethod - read function');

            result = contract[options.functionName](...params);
        } else {
            logger.info('invokeContractMethod - write function');

            if (options.printEstimatedGas) {
                logger.info('invokeContractMethod - estimated gas begin');
                const gas: BigNumber = await contract.estimateGas[options.functionName](
                    ...params,
                    options.msgValue !== undefined ? { value: options.msgValue } : {}
                );
                logger.info('invokeContractMethod - estimated gas done:', gas.toString());
            }

            const populatedTransaction: PopulatedTransaction = await contract.populateTransaction[options.functionName](
                ...params,
                options.msgValue !== undefined ? { value: options.msgValue } : {}
            );
            logger.info('populatedTransaction:', populatedTransaction);

            result = options.sendCall
                ? ContractService.getSigner(globalThis.provider, user.address).call(populatedTransaction)
                : ContractService.getSigner(globalThis.provider, user.address).sendTransaction(populatedTransaction);
        }

        logger.info('invokeContractMethod - result:', result);

        // Returns the underlying Promise as is
        return result;
    }

    // returns the checksummed address if the address is valid, otherwise returns false
    private static isAddress(value: any): string | false {
        try {
            return getAddress(value);
        } catch {
            return false;
        }
    }

    // account is not optional
    private static getSigner(library: Web3Provider, account: string): JsonRpcSigner {
        return library.getSigner(account).connectUnchecked();
    }

    // account is optional
    private static getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
        return account ? ContractService.getSigner(library, account) : library;
    }

    // account is optional
    public static getContract(address: string, abi: any, library: Web3Provider, account?: string): Contract {
        if (!ContractService.isAddress(address) || address === AddressZero) {
            throw Error(`Invalid 'address' parameter '${address}'.`);
        }

        return new Contract(address, abi, ContractService.getProviderOrSigner(library, account) as any);
    }
}
