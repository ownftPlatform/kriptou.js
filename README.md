<h2 align="center">Kriptou (crypto) SDK for JavaScript</h2>

A library that gives you access to the underlying blockchain

- all client side
- no backend needed</li>

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
        logger: {
            level: 'info'
        },
        chain: {
            performValidation: boolean,
            delayValidation: boolean,
            supportedChains: [Kriptou.supportedNetworks.Rinkarby],
            walletNotConnectedHandler: () => {
                // When the wallet is not connected 
            },
            chainCheckFailedHandler: () => {
                // When the current Chain Id selected in the wallet needs to be changed
            }
        }
    }
);
```

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

