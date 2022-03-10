import { getAddress } from '@ethersproject/address';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { Kriptou } from '../index';
import { BigNumberish } from '@ethersproject/bignumber';

type ContractMethodInvocationParams = Record<string, any>;

export interface KriptouContractMethodInvocationOptionsInternal {
    contractAddress: string;
    functionName: string;
    abi: any;
    params?: ContractMethodInvocationParams;
    msgValue?: BigNumberish;
}

export class ContractService {
    constructor() {
        console.log('ContractService :: ctor');
    }

    static blockchain: any;

    static invokeContractMethod(options: Kriptou.Types.ContractMethodInvocationOptions, user: Kriptou.Types.User): Promise<any> {
        console.log('ContractService :: invokeContractMethod', options);

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
        const transactionMethod: string = isReadFunction ? 'call' : 'send';

        let contract: any = new ContractService.blockchain.Contract(options.abi, options.contractAddress, {
            from: user.address
        });

        const params: Array<any> =
            options.params !== undefined ? Object.entries(options.params).map((a: [string, any]) => a[1]) : [];

        const result: any = contract?.methods[options.functionName](...params)[transactionMethod](
            options.msgValue !== undefined ? { value: options.msgValue } : {}
        );
        console.log('ContractService :: invokeContractMethod - result:', result);

        // Returns the underlying Promise as is
        return result;

        // contract?.methods[options.functionName](...Object.entries(options.params).map((a: [string, any]) => a[1]))[
        //     transactionMethod
        //     ](options.msgValue !== undefined ? { value: options.msgValue } : {}, (error: any, result: any) => {
        //     console.log(`ContractService :: invokeContractMethod :: ${options.functionName}`, error, result);
        //     if (error !== undefined && error !== null) {
        //         // this.rxEvents.next({ eventType: CommonEvent.Error, data: error });
        //         return;
        //     }
        //     // TODO: Implement new event
        //     // this.rxEvents.next({ eventType: SomeEvent.SomeType, data: result });
        // });
        //
        // return Promise.resolve({});
    }

    // returns the checksummed address if the address is valid, otherwise returns false
    static isAddress(value: any): string | false {
        try {
            return getAddress(value);
        } catch {
            return false;
        }
    }

    // account is not optional
    static getSigner(library: Web3Provider, account: string): JsonRpcSigner {
        return library.getSigner(account).connectUnchecked();
    }

    // account is optional
    static getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
        return account ? ContractService.getSigner(library, account) : library;
    }

    // account is optional
    static getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
        if (!ContractService.isAddress(address) || address === AddressZero) {
            throw Error(`Invalid 'address' parameter '${address}'.`);
        }

        return new Contract(address, ABI, ContractService.getProviderOrSigner(library, account) as any);
    }
}
