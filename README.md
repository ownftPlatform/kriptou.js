<h2 align="center">Kriptou (crypto) SDK for JavaScript</h2>

A library that gives you access to the underlying blockchain

- all client side
- no backend needed</li>

## Getting started

### Initialise

```typescript
Kriptou.init();
```

### Events

#### React to 'UserLoggedIn' event (async):

```typescript
Kriptou.subscribe(
    {
        listener: 'ListenerName ',
        events: [Kriptou.events.UserLoggedIn]
    },
    (user: Kriptou.Types.User) => {
        // do something with 'user'
    }
);
```

#### React to 'NetworkUpdated' event (async):

```typescript
        Kriptou.subscribe(
    {
        listener: 'ListenerName',
        events: [Kriptou.events.NetworkUpdated]
    },
    (network: Kriptou.Types.Network | undefined) => {
        // do something with 'network', if undefined then selected network not supported
    }
);
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

