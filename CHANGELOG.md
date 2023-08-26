# 0.0.86 (2023-08-26)

### Features

* Merge pull request #8 from ownftPlatform/feature/misc (kr1p70n1c) ([`db583d8`](https://github.com/ownftPlatform/kriptou.js/commit/db583d8ccb6a2d29db927a76aa64c2ecb5df1308))
* feat(misc): Various updates. (kr1p70n1c) ([`f567b29`](https://github.com/ownftPlatform/kriptou.js/commit/f567b29b8eab23b6d1f3d9eda0bbb7c9458b909e))

### Chore

* chore(nodejs): Removed build support for `14.x` and added `20.x`. (kr1p70n1c) ([`460c178`](https://github.com/ownftPlatform/kriptou.js/commit/460c1782e35807d0b91f2e70e88669a6a7e78fa6))

# 0.0.83 (2023-02-17)

### Features

* feat(unlock-metamask): Calling `eth_requestAccounts` now to unlock `MetaMask` when it is locked and improved the handling of the `Promise` response. (kr1p70n1c) ([`2894d19`](https://github.com/ownftPlatform/kriptou.js/commit/2894d19afc64fdeb54a37c8a1959e586cc8a9b94))

### Documentation

* docs(changelog): `CHANGELOG` for `0.0.83` release. (kr1p70n1c) ([`dfa5093`](https://github.com/ownftPlatform/kriptou.js/commit/dfa50933307c307bdc9982fce058cc76452b5078))

### Chore

* chore(unlock-metamask): Bumped version. (kr1p70n1c) ([`8f697ca`](https://github.com/ownftPlatform/kriptou.js/commit/8f697ca68725729d23bdbbb3e3a927aaf1cbb384))

### Misc (pre semantic commit messages)

* Merge pull request #7 from kr1p70n1c/feature/unlock-metamask (kr1p70n1c) ([`4e8d7fc`](https://github.com/ownftPlatform/kriptou.js/commit/4e8d7fc794d1bbcfd74f3751fcddcb00f8f261fd))

# 0.0.82 (2023-02-17)

### Features

* feat(balance-and-write-transactions): Improved when the balance is retrieved and also using `ethers.js` now for Transactions and not `web3.js` anymore. (kr1p70n1c) ([`b93d0f2`](https://github.com/ownftPlatform/kriptou.js/commit/b93d0f26daf417807dc8970157e469d417242d7b))
* feat(balance-and-write-transactions): Added `printEstimatedGas` option. (kr1p70n1c) ([`657f5b7`](https://github.com/ownftPlatform/kriptou.js/commit/657f5b7a567a95cab291190333269c5e4c0ff280))

### Documentation

* docs(changelog): `CHANGELOG` for `0.0.82` release. (kr1p70n1c) ([`4e90bb5`](https://github.com/ownftPlatform/kriptou.js/commit/4e90bb582d940ce1e420fba37bbffd802d44be1e))

### Chore

* chore(balance-and-write-transactions): Updated pkg versions. (kr1p70n1c) ([`caad8d0`](https://github.com/ownftPlatform/kriptou.js/commit/caad8d0d8b90b10926a6fef6f6761da61771f25c))
* chore(improvements): Bumped version. (kr1p70n1c) ([`cca4407`](https://github.com/ownftPlatform/kriptou.js/commit/cca4407fd62bc27c440f51b2e73783c4b0a5ae98))
* chore(balance-and-write-transactions): Bumped the `nodejs` version. (kr1p70n1c) ([`8766e2d`](https://github.com/ownftPlatform/kriptou.js/commit/8766e2de9c5e3318672b365ef4f837c39cec7622))
* chore(balance-and-write-transactions): Removed redundant comment. (kr1p70n1c) ([`fda960d`](https://github.com/ownftPlatform/kriptou.js/commit/fda960db1577c903b272bab3973d9bdd8200fce6))

### Misc (pre semantic commit messages)

* Merge pull request #6 from kr1p70n1c/feature/improvements (kr1p70n1c) ([`c4d62ca`](https://github.com/ownftPlatform/kriptou.js/commit/c4d62cae664ebd5679667cb42561ddbcd755873b))

# 0.0.56 (2022-11-30)

### Features

* feat(latest-updates): Removed all things `wyvern protocol` again. (kr1p70n1c) ([`a23a1b4`](https://github.com/ownftPlatform/kriptou.js/commit/a23a1b47af8e349216ad367ef55e4c6577f4c4fa))
* feat(latest-updates): Latest changes of the past few weeks whilst intergrating with a dapp. (kr1p70n1c) ([`2bb71a9`](https://github.com/ownftPlatform/kriptou.js/commit/2bb71a9f300e7d0be898223dbcb3bb72af82824d))

### Documentation

* docs(changelog): `CHANGELOG` for `0.0.56` release. (kr1p70n1c) ([`ab1ac65`](https://github.com/ownftPlatform/kriptou.js/commit/ab1ac654cdfa74b891a24aa5fd2d321862d9bd02))
* docs(latest-updates): Removed all things `wyvern protocol`. (kr1p70n1c) ([`7b1c09a`](https://github.com/ownftPlatform/kriptou.js/commit/7b1c09afe9c77b971010bcce63d2f2a369293b4f))

### Chore

* chore(latest-updates): Bumped version and updated packages. (kr1p70n1c) ([`22ff32c`](https://github.com/ownftPlatform/kriptou.js/commit/22ff32cf37299645d48f5a14ac0b34500ad7e2b9))
* chore(version): Bumped the version again in order to deploy on `npmjs`. (kr1p70n1c) ([`9da04fc`](https://github.com/ownftPlatform/kriptou.js/commit/9da04fc6c625e1b03478bc87055e0b31fc36253c))

### Misc (pre semantic commit messages)

* Merge pull request #5 from kr1p70n1c/feature/latest-updates (kr1p70n1c) ([`4810da3`](https://github.com/ownftPlatform/kriptou.js/commit/4810da3a89defb20fde16150aba6f628f0e8babe))

# 0.0.42 (2022-09-05)

### Features

* feat(chains): Refactored the network/chains types and how they are loaded (included a network file with current EVM chains supported). (kr1p70n1c) ([`f281941`](https://github.com/ownftPlatform/kriptou.js/commit/f281941589df85500286a82c9d40ec7538e0dafd))
* Merge pull request #4 from kr1p70n1c/feature/chains-refactor (kr1p70n1c) ([`83d56f4`](https://github.com/ownftPlatform/kriptou.js/commit/83d56f45f7a66695bb0af0c5db4891b25f730711))

### Documentation

* docs(changelog): `CHANGELOG` for `0.0.42` release. (kr1p70n1c) ([`a7bba7c`](https://github.com/ownftPlatform/kriptou.js/commit/a7bba7c81cea1594e11972138676a7762ed52696))
* docs(changelog): Cleanup. (kr1p70n1c) ([`e64336f`](https://github.com/ownftPlatform/kriptou.js/commit/e64336fdf1f97377fc59415e988fb3f704b3eec5))

# 0.0.37 (2022-06-16)

### Features

* feat(wyvern-plugin): Started with the `Wyvern Protocol` plugin implementation. (kr1p70n1c) ([`8cbc0cd`](https://github.com/ownftPlatform/kriptou.js/commit/8cbc0cd4482cabcef9714cb0073cfa3754ab5fcf))
* feat(wyvern-plugin): More progress with `Wyvern` plugin, added predicate functions. (kr1p70n1c) ([`239722b`](https://github.com/ownftPlatform/kriptou.js/commit/239722ba7b770b744b361b1e3814e731e268b19d))

### Documentation

* docs(changelog): `CHANGELOG` for `0.0.37` release. (kr1p70n1c) ([`3036345`](https://github.com/ownftPlatform/kriptou.js/commit/3036345d4bb5eb385ad27633ddf58b88826ba84e))
* docs(wyvern-plugin): Added link to the `Wyvern` plugin document from the main `README`. (kr1p70n1c) ([`e3fe874`](https://github.com/ownftPlatform/kriptou.js/commit/e3fe8748ba7e90856f5421ab6ed21f1de55ce844))

### Chore

* chore(wyvern-plugin): Removed commented code. (kr1p70n1c) ([`dd7ef69`](https://github.com/ownftPlatform/kriptou.js/commit/dd7ef699b7195aab2d0944f5421a6087a15a0a37))
* chore(wyvern-plugin): Bumped version. (kr1p70n1c) ([`0d0d5eb`](https://github.com/ownftPlatform/kriptou.js/commit/0d0d5ebb07b5222c6939b46c1a037f4b95d2a871))

### Misc (pre semantic commit messages)

* Merge pull request #3 from kr1p70n1c/feature/wyvern-plugin (kr1p70n1c) ([`6423d7c`](https://github.com/ownftPlatform/kriptou.js/commit/6423d7c3cffdeaf1e11771f6c431c8ddaab33574))

# 0.0.36 (2022-06-14)

### Fixes

* fix(readme): Removed unnecessary text from `README`. (kr1p70n1c) ([`e81a199`](https://github.com/ownftPlatform/kriptou.js/commit/e81a1992f8a6b12e7e14ce6873b08e8252a4c399))

### Documentation

* docs(changelog): `CHANGELOG` for `0.0.36` release. (kr1p70n1c) ([`3e34cfc`](https://github.com/ownftPlatform/kriptou.js/commit/3e34cfc73eade95c14706bbb77d2bd5590e34bb5))

### CI

* ci(actions): Debugging workflow that does not start. (kr1p70n1c) ([`36b918a`](https://github.com/ownftPlatform/kriptou.js/commit/36b918ad47748fea369edd9c711f8544eb1363e4))
* ci(actions): Debugging workflow that does not start. (kr1p70n1c) ([`030d33d`](https://github.com/ownftPlatform/kriptou.js/commit/030d33d080d77446f406fa834b86182015f9ff17))

### Chore

* chore(version): Bumped the version. (kr1p70n1c) ([`64851bb`](https://github.com/ownftPlatform/kriptou.js/commit/64851bb198a73134878193b3f4a19469d9008689))

### Misc (pre semantic commit messages)

* Merge pull request #2 from kr1p70n1c/feature/doc-updates (kr1p70n1c) ([`6e51182`](https://github.com/ownftPlatform/kriptou.js/commit/6e51182b5644f884ce12d7faef02e7e6cdca8411))
* doc(wyvern): Added placeholder heading for `Wyvern Protocol`. (kr1p70n1c) ([`cc7e1bd`](https://github.com/ownftPlatform/kriptou.js/commit/cc7e1bdfcc5530422a8e09b601b5d41d6bc89d28))
* doc(extra-info): Updated `README` to resolve items not specified before. (kr1p70n1c) ([`c095eb9`](https://github.com/ownftPlatform/kriptou.js/commit/c095eb99213aa3d09128ce0f3ba5f2737c7a868b))
* doc(badge): Updated the badge for the `PR workflow. (kr1p70n1c) ([`551bb28`](https://github.com/ownftPlatform/kriptou.js/commit/551bb2847785abd555e41a91ceb189575b8fadf9))
* doc(extra-info): Added extra info to display in the `README`. (kr1p70n1c) ([`d5f0e6d`](https://github.com/ownftPlatform/kriptou.js/commit/d5f0e6d639d4634d3991186ad71370a618aba6c4))

# 0.0.35 (2022-06-14)

### Features

* feat(eth_signTypedData_v3): Added support for `eth_signTypedData_v3`. (kr1p70n1c) ([`982bceb`](https://github.com/ownftPlatform/kriptou.js/commit/982bceba1da6da20b5bca38220679fd149cb9415))

### Documentation

* docs(changelog): `CHANGELOG` for `0.0.35` release. (kr1p70n1c) ([`7cbaa4b`](https://github.com/ownftPlatform/kriptou.js/commit/7cbaa4bdd7273aaa7c50cfacc69965c726a8c192))
* docs(changelog): Updated `CHANGELOG` for `0.0.35` release again. (kr1p70n1c) ([`4e2dc8d`](https://github.com/ownftPlatform/kriptou.js/commit/4e2dc8d9f4e9dad7b42a87f98125e1d08750f30c))

### CI

* ci(eth_signTypedData_v3): Added `github actions` workflow. (kr1p70n1c) ([`185e625`](https://github.com/ownftPlatform/kriptou.js/commit/185e625eeaa141d2871a601eda8670f8a1ae081e))

### Chore

* chore(eth_signTypedData_v3): Bumped versions. (kr1p70n1c) ([`db3dfd4`](https://github.com/ownftPlatform/kriptou.js/commit/db3dfd4bd363b65e50af56637e046173a679bee3))

### Misc (pre semantic commit messages)

* Merge pull request #1 from kr1p70n1c/feature/eth_signTypedData_v3-support (kr1p70n1c) ([`6485248`](https://github.com/ownftPlatform/kriptou.js/commit/64852489317424a9740d67801985d5d44d2ac9c9))

# 0.0.33 (2022-05-24)

### Features

* feat(accounts-change-config): Made actions for `Accounts Changed` configurable (#110) (kr1p70n1c) ([`539615e`](https://github.com/ownftPlatform/kriptou.js/commit/539615ec1a71ddeab106dde18cdce96eae030729))

### Documentation

* docs(accounts-change-config): Updated the documentation with the latest config changes (#110) (kr1p70n1c) ([`71f7015`](https://github.com/ownftPlatform/kriptou.js/commit/71f7015a54384db888e72f1d003f983ab7e0f059))
* docs(changelog): `CHANGELOG` for `0.0.33` release. (kr1p70n1c) ([`29eb28c`](https://github.com/ownftPlatform/kriptou.js/commit/29eb28c07e55177fbae8bd893628ce49b269a960))

### Chore

* chore(accounts-change-config): Bumped version and upgraded pacakges (#110) (kr1p70n1c) ([`11ca219`](https://github.com/ownftPlatform/kriptou.js/commit/11ca2198df9c16bd9f396d5f85292633737e0bdb))

# 0.0.32 (2022-04-15)

### Features

* feat(eth-personal-sign): Added `ETH personal sign` methods via `MM` usage. (kr1p70n1c) ([`b05806a`](https://github.com/ownftPlatform/kriptou.js/commit/b05806a3850b7e35eae6c701047a56b63338a090))

### Documentation

* docs(changelog): `CHANGELOG` for `0.0.32` release. (kr1p70n1c) ([`7558ca6`](https://github.com/ownftPlatform/kriptou.js/commit/7558ca65a21e616a2caea6a405f1b8279d4be40a))

### Chore

* chore(eth-personal-sign): Bumped version. (kr1p70n1c) ([`fc935ef`](https://github.com/ownftPlatform/kriptou.js/commit/fc935ef372d2807223f3c9fa6ea728f7d7a7cdba))

# 0.0.31 (2022-03-19)

### Features

* feat(events): Returning the `Subscription` so that the client code can `unsubscribe` when it needs to (#80) (kr1p70n1c) ([`e909f23`](https://github.com/ownftPlatform/kriptou.js/commit/e909f23e313ed691f2200d7368e36d3208a3e957))

### Refactor

* refactor(events): Renamed `event` to `_events`, the plural fits better, and using `_` to not clash with the already exported `events` types. (kr1p70n1c) ([`85dcf4d`](https://github.com/ownftPlatform/kriptou.js/commit/85dcf4d6d1152152df1941cb068f515f017b2c0a))

### Documentation

* docs(events): Updated the `README`. (kr1p70n1c) ([`adfbad1`](https://github.com/ownftPlatform/kriptou.js/commit/adfbad10bba60513d9059c667c725b363ff433fa))
* docs(changelog): `CHANGELOG` for `0.0.31` release. (kr1p70n1c) ([`fcd70b1`](https://github.com/ownftPlatform/kriptou.js/commit/fcd70b152b1c33658fa5c0c5f802ad92b46256ad))
* docs(readme): Updated the `README.md` doc. (kr1p70n1c) ([`f6317d0`](https://github.com/ownftPlatform/kriptou.js/commit/f6317d0822e93ce50fdc7f0981cf32c9ed9ad6d6))

### Chore

* chore(chain-changed-event): The reload of the page upon `chain/network change` can be disabled (#80) (kr1p70n1c) ([`67886f1`](https://github.com/ownftPlatform/kriptou.js/commit/67886f1073992529478f69e31242dd10382fec44))
* chore(chain-changed-event): Bumped version (#80) (kr1p70n1c) ([`4eaf53b`](https://github.com/ownftPlatform/kriptou.js/commit/4eaf53ba0e7be82bc1da036928a8d1b3ecc5a455))

# 0.0.26 (2022-03-14)

### Features

* feat(initial-project): Bulk commit of the initial version of the project. (kr1p70n1c) ([`c2e3c07`](https://github.com/ownftPlatform/kriptou.js/commit/c2e3c0793764afbf87d8bb81fc85581df3a9d0b4))
* feat(connection-and-network): Wallet connection and network state improvements. (kr1p70n1c) ([`5103e5e`](https://github.com/ownftPlatform/kriptou.js/commit/5103e5e4db833290279830ebe99e7484021749fa))

### Documentation

* docs(changelog): Added pkg to generate the `CHANGELOG.md` file. (kr1p70n1c) ([`9981c0f`](https://github.com/ownftPlatform/kriptou.js/commit/9981c0f5aa6657b7e25e882e80da97aa3ca643a6))
* docs(changelog): `CHANGELOG` for `0.0.26` release. (kr1p70n1c) ([`9f0cef4`](https://github.com/ownftPlatform/kriptou.js/commit/9f0cef4fe1c459bb92be978ceff677b95b6f5ea0))
* docs(readme): Removed unnecessary line feed. (kr1p70n1c) ([`10fd785`](https://github.com/ownftPlatform/kriptou.js/commit/10fd785235ebf07c936c8d3b2fe7cdf3727e053b))

### Chore

* chore(eslint): Applied `eslint` and made the `logger` code browser-friendly. (kr1p70n1c) ([`4dd0ba9`](https://github.com/ownftPlatform/kriptou.js/commit/4dd0ba9d49c2f35bf6406843165e553665150ca7))
* chore(project-setup): Initial `README` commit. (kr1p70n1c) ([`3877ea3`](https://github.com/ownftPlatform/kriptou.js/commit/3877ea3970133740c01923f3e83ac01610146747))
* chore(loggers): Removed redundant loggers. (kr1p70n1c) ([`84703d3`](https://github.com/ownftPlatform/kriptou.js/commit/84703d393f6d08f44c7fe6d6e71827bbe44fb3ca))
* chore(eslint): Removed redundant comments. (kr1p70n1c) ([`fa034c8`](https://github.com/ownftPlatform/kriptou.js/commit/fa034c8ea614737475095e00f718bf293a39063d))
* chore(eslint): Removed `ignorePatterns` property as the `.eslintignore` is being used. (kr1p70n1c) ([`3dfff4f`](https://github.com/ownftPlatform/kriptou.js/commit/3dfff4f2f5ee04b282c42631db3ec0a76d8d723f))
