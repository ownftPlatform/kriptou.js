# 0.0.33 (2022-05-24)

### Features

* feat(accounts-change-config): Made actions for `Accounts Changed` configurable (#110) (kr1p70n1c) ([`539615e`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/539615ec1a71ddeab106dde18cdce96eae030729))

### Documentation

* docs(accounts-change-config): Updated the documentation with the latest config changes (#110) (kr1p70n1c) ([`71f7015`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/71f7015a54384db888e72f1d003f983ab7e0f059))

### Chore

* chore(accounts-change-config): Bumped version and upgraded pacakges (#110) (kr1p70n1c) ([`11ca219`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/11ca2198df9c16bd9f396d5f85292633737e0bdb))

# 0.0.32 (2022-04-15)

### Features

* feat(eth-personal-sign): Added `ETH personal sign` methods via `MM` usage. (kr1p70n1c) ([`b05806a`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/b05806a3850b7e35eae6c701047a56b63338a090))

### Documentation

* docs(changelog): `CHANGELOG` for `0.0.32` release. (kr1p70n1c) ([`7558ca6`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/7558ca65a21e616a2caea6a405f1b8279d4be40a))

### Chore

* chore(eth-personal-sign): Bumped version. (kr1p70n1c) ([`fc935ef`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/fc935ef372d2807223f3c9fa6ea728f7d7a7cdba))

# 0.0.31 (2022-03-19)

### Features

* feat(events): Returning the `Subscription` so that the client code can `unsubscribe` when it needs to (#80) (kr1p70n1c) ([`e909f23`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/e909f23e313ed691f2200d7368e36d3208a3e957))

### Refactor

* refactor(events): Renamed `event` to `_events`, the plural fits better, and using `_` to not clash with the already exported `events` types. (kr1p70n1c) ([`85dcf4d`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/85dcf4d6d1152152df1941cb068f515f017b2c0a))

### Documentation

* docs(events): Updated the `README`. (kr1p70n1c) ([`adfbad1`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/adfbad10bba60513d9059c667c725b363ff433fa))
* docs(changelog): `CHANGELOG` for `0.0.31` release. (kr1p70n1c) ([`fcd70b1`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/fcd70b152b1c33658fa5c0c5f802ad92b46256ad))
* docs(readme): Updated the `README.md` doc. (kr1p70n1c) ([`f6317d0`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/f6317d0822e93ce50fdc7f0981cf32c9ed9ad6d6))

### Chore

* chore(chain-changed-event): The reload of the page upon `chain/network change` can be disabled (#80) (kr1p70n1c) ([`67886f1`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/67886f1073992529478f69e31242dd10382fec44))
* chore(chain-changed-event): Bumped version (#80) (kr1p70n1c) ([`4eaf53b`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/4eaf53ba0e7be82bc1da036928a8d1b3ecc5a455))

# 0.0.26 (2022-03-14)

### Features

* feat(initial-project): Bulk commit of the initial version of the project. (kr1p70n1c) ([`c2e3c07`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/c2e3c0793764afbf87d8bb81fc85581df3a9d0b4))
* feat(connection-and-network): Wallet connection and network state improvements. (kr1p70n1c) ([`5103e5e`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/5103e5e4db833290279830ebe99e7484021749fa))

### Documentation

* docs(changelog): Added pkg to generate the `CHANGELOG.md` file. (kr1p70n1c) ([`9981c0f`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/9981c0f5aa6657b7e25e882e80da97aa3ca643a6))
* docs(changelog): `CHANGELOG` for `0.0.26` release. (kr1p70n1c) ([`9f0cef4`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/9f0cef4fe1c459bb92be978ceff677b95b6f5ea0))
* docs(readme): Removed unnecessary line feed. (kr1p70n1c) ([`10fd785`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/10fd785235ebf07c936c8d3b2fe7cdf3727e053b))

### Chore

* chore(eslint): Applied `eslint` and made the `logger` code browser-friendly. (kr1p70n1c) ([`4dd0ba9`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/4dd0ba9d49c2f35bf6406843165e553665150ca7))
* chore(project-setup): Initial `README` commit. (kr1p70n1c) ([`3877ea3`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/3877ea3970133740c01923f3e83ac01610146747))
* chore(loggers): Removed redundant loggers. (kr1p70n1c) ([`84703d3`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/84703d393f6d08f44c7fe6d6e71827bbe44fb3ca))
* chore(eslint): Removed redundant comments. (kr1p70n1c) ([`fa034c8`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/fa034c8ea614737475095e00f718bf293a39063d))
* chore(eslint): Removed `ignorePatterns` property as the `.eslintignore` is being used. (kr1p70n1c) ([`3dfff4f`](https://bitbucket.org/wen-moon-market/kriptou.js/commits/3dfff4f2f5ee04b282c42631db3ec0a76d8d723f))
