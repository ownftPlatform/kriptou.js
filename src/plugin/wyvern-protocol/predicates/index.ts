/** ***********************
 * MIT
 * Copyright (c) 2022 Wen Moon Market
 **************************/

type Address = any;
type Uint256 = any;
type Bytes = any;
type Bytest4 = any;

export class WyvernProtocolPredicate {
    public functionDefinition: string;
    public argumentsTypes: Array<string>;
    public argumentsValues: Array<any>;
}

export class WyvernProtocolPredicateTransferERC721Exact extends WyvernProtocolPredicate {
    constructor(token: Address, tokenId: Uint256) {
        super();
        this.functionDefinition = 'transferERC721Exact(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address', 'uint256'];
        this.argumentsValues = [token, tokenId];
    }
}

export class WyvernProtocolPredicateTransferERC20Exact extends WyvernProtocolPredicate {
    constructor(token: Address, amount: Uint256) {
        super();
        this.functionDefinition = 'transferERC20Exact(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address', 'uint256'];
        this.argumentsValues = [token, amount];
    }
}

export class WyvernProtocolPredicateSequenceAnyAfter extends WyvernProtocolPredicate {
    constructor(addrs: Array<Address>, extradataLengths: Array<Uint256>, selectors: Array<Bytest4>, extradatas: Bytes) {
        super();
        this.functionDefinition = 'sequenceAnyAfter(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address[]', 'uint256[]', 'bytes4[]', 'bytes'];
        this.argumentsValues = [addrs, extradataLengths, selectors, extradatas];
    }
}

export class WyvernProtocolPredicateSplit extends WyvernProtocolPredicate {
    constructor(targets: Array<Address>, selectors: Array<Bytest4>, firstExtradata: Bytes, secondExtradata: Bytes) {
        super();
        this.functionDefinition = 'split(bytes,address[7],uint8[2],uint256[6],bytes,bytes)';
        this.argumentsTypes = ['address[2]', 'bytes4[2]', 'bytes', 'bytes'];
        this.argumentsValues = [targets, selectors, firstExtradata, secondExtradata];
    }
}

export class WyvernProtocolPredicateTransferERC20ExactTo extends WyvernProtocolPredicate {
    constructor(token: Address, amount: Uint256, to: Address) {
        super();
        this.functionDefinition = 'transferERC20ExactTo(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address', 'uint256', 'address'];
        this.argumentsValues = [token, amount, to];
    }
}

export class WyvernProtocolPredicateSequenceExact extends WyvernProtocolPredicate {
    constructor(addrs: Array<Address>, extradataLengths: Array<Uint256>, selectors: Array<Bytest4>, extradatas: Bytes) {
        super();
        this.functionDefinition = 'sequenceExact(bytes,address[7],uint8,uint256[6],bytes)';
        this.argumentsTypes = ['address[]', 'uint256[]', 'bytes4[]', 'bytes'];
        this.argumentsValues = [addrs, extradataLengths, selectors, extradatas];
    }
}
