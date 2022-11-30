<h2 align="center">Kriptou (crypto) SDK for JavaScript</h2>

[![NPM Package Version][npm-image-version]][npm-url] [![NPM Package Downloads][npm-image-downloads]][npm-url] [![Build Status][actions-image]][actions-url]

A library that gives you access to the underlying blockchain

- all client side
- no backend needed

## Getting started

### Initialise

#### Without configuration

```typescript
Kriptou.init();
```

#### With configuration

```typescript
Kriptou.init(
    {
        /**
         * The log level.
         */
        logger: {
            level: 'info'
        },

        /**
         * Chain/network configuration.
         */
        chain: {
            performValidation: boolean,
            delayValidation: boolean,
            supportedChains: [Kriptou.supportedNetworks.Rinkarby],
            walletNotConnectedHandler: () => {
                // When the wallet is not connected 
            },
            chainCheckFailedHandler: () => {
                // When the current Chain Id selected in the wallet needs to be changed
            },
            
            /**
             * Whether the page reloads when the chain/network has changed.
             */
            changeReloadEnabled: boolean
        },

        /**
         * Accounts configuration.
         */
        accounts: {
            /**
             * Whether the page reloads when the account has changed.
             *
             * When the `changeHandler` is configured this setting is ignored and the page reload will not execute.
             */
            changeReloadEnabled: boolean,

            /**
             * Handler to execute when the account has changed.
             *
             * When this handler is configured then the page will not auto reload, the developer will have to implement the
             * page-reload in the handler if this behaviour is required.
             */
            changeHandler: (accounts: Array<string>) => {
                // When the account has changed (accounts is string array of connected wallet addresses)
            }
        }
    }
);
```

### Events

#### React to 'UserLoggedIn' event (async):

```typescript
Kriptou.Events.subscribe(
    {
        listener: 'ListenerName ',
        event: Kriptou.events.UserLoggedIn
    },
    (user: Kriptou.Types.User) => {
        // do something with 'user'
    }
);
```

This `subscribe` method returns a `Kriptou.Types.Subscription` which can be used to unsubscribe again.

#### React to 'NetworkUpdated' event (async):

```typescript
Kriptou.Events.subscribe(
    {
        listener: 'ListenerName',
        event: Kriptou.events.NetworkUpdated
    },
    (network: Kriptou.Types.Network | undefined) => {
        // do something with 'network', if undefined then selected network not supported
    }
);
```

This `subscribe` method returns a `Kriptou.Types.Subscription` which can be used to unsubscribe again.

### Signature methods

#### sign

Calculates an Ethereum specific signature (`web3.eth.personal.sign`).

```typescript
Kriptou.Signature.sign
```

#### verifySigner

Verifies whether the connected address (or the one provided as argument) signed the data with the `sign` method.

It uses the `getSigner` method under the hood.

```typescript
Kriptou.Signature.verifySigner
```

#### getSigner

Gets the account (`web3.eth.personal.ecRecover`) that signed the data with the `sign` method.

```typescript
Kriptou.Signature.getSigner
```

### Wyvern Protocol

[Documentation](src/plugin/wyvern-protocol/README.md)

### Next steps

#### Connect wallet

```
[TBC]
```

#### Retrieve user

```
[TBC]
```

#### Switch network

```
[TBC]
```

## Browser applications

### Angular project

(This documentation should live in an `angular` seed project rather)

With a newly created angular project, with `angular-cli`, ensure the following configs:

#### webpack.config.js

Put this file in the root of your project:

```javascript
const webpack = require('webpack');

module.exports = {
    node: {
        global: true
    },
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
            assert: require.resolve('assert/'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            url: false,
            events: require.resolve('events/')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ]
};
```

#### Node modules

Dependencies:

```
npm i stream-browserify crypto-browserify assert stream-http https-browserify os-browserify path-browserify events
```

Dev dependencies:

```
npm i @angular-builders/custom-webpack process --save-dev
```

[npm-image-version]: https://img.shields.io/npm/v/kriptou.js.svg
[npm-image-downloads]: https://img.shields.io/npm/dm/kriptou.js.svg
[npm-url]: https://npmjs.org/package/kriptou.js
[actions-image]: https://github.com/kr1p70n1c/kriptou.js/actions/workflows/github-actions.yml/badge.svg
[actions-url]: https://github.com/kr1p70n1c/kriptou.js/actions/workflows/github-actions.yml
