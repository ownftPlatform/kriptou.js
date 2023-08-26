/** ***********************
 * MIT
 * Copyright (c) 2022 ownft Platform
 **************************/

export class AccountsNotFoundError extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}
