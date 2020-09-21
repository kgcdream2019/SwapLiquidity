const HDWalletProvider = require('truffle-hdwallet-provider');
const PrivateKeyProvider = require("truffle-privatekey-provider");
var infuraProjectId = '47d0397f2c8644e8ae13bf09a066155e';
module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      // port: 8545, // Standard Ethereum port (default: none)
      network_id: '*', // eslint-disable-line camelcase
    },

    rinkeby: {
      provider: () => new HDWalletProvider(process.env.DEV_MNEMONIC, 'https://rinkeby.infura.io/v3/' + infuraProjectId),
      network_id: 4, // eslint-disable-line camelcase
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },

    ropsten: {
      provider: function() {
        // Or, pass an array of private keys, and optionally use a certain subset of addresses
        var privateKeys = [
          "1F3EDEA48BCE8BB6357ABABC55610A36225873434F43E570655E62C0E65366F3",

        ];
        return new HDWalletProvider(privateKeys, "https://ropsten.infura.io/v3/" + infuraProjectId)
      },
      network_id: 3, // eslint-disable-line camelcase
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },

    kovan: {
      provider: function() {
        // Or, pass an array of private keys, and optionally use a certain subset of addresses
        var privateKeys = [
          "8865fd5725e751d432ff9076d937c0f383133c25301bc1b1ac623cfee74d60fb",
        ];
        return new HDWalletProvider(privateKeys, "https://kovan.infura.io/v3/" + infuraProjectId);
      },
      network_id: 42, // eslint-disable-line camelcase
      gas: 12400000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    binancetestnet: {  // binance smart chain testnet
      provider: function() {
        // Or, pass an array of private keys, and optionally use a certain subset of addresses
        var privateKeys = [
          "8865fd5725e751d432ff9076d937c0f383133c25301bc1b1ac623cfee74d60fb", //Pet-Defi-deployer
          // "134e98452a560d4356bece4743110c7772b1c691c81006e6eb2526bad923cd19", //Pet-Defi-Dev
          // "3cd98c4150cf645f750aec42e4caef3af75e9722eb34a93111a18eb41d9daed0", //Pet-Defi-3
          // "febc2b9330711d69829a6be39dc4df39934b601cb39ec4d69c7306e6afd17a3a", //Pet-Defi-4
        ];
        var privateKey = "8865fd5725e751d432ff9076d937c0f383133c25301bc1b1ac623cfee74d60fb";
        return new HDWalletProvider(privateKeys, "https://data-seed-prebsc-1-s2.binance.org:8545");
        // return new PrivateKeyProvider(privateKey, "https://data-seed-prebsc-1-s2.binance.org:8545");
      },
      network_id: 97, // eslint-disable-line camelcase
      gas: 29000000, // Ropsten has a lower block limit than mainnet
      // gasPrice: 25000000000, // 122 gwei
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    live: {
      provider: function () {
        // Or, pass an array of private keys, and optionally use a certain subset of addresses
        var privateKeys = [
          "1F3EDEA48BCE8BB6357ABABC55610A36225873434F43E570655E62C0E65366F3",
        ];
        return new HDWalletProvider(privateKeys, "https://mainnet.infura.io/v3/" + infuraProjectId);
      },
      network_id: 1,
      gas: 1500000 ,
      gasPrice: 35000000000,   // check https://ethgasstation.info/
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false     // Skip dry run before migrations? (default: false for public nets )
    }
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  //
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 1000     // Default: 200
        }
        //,        evmVersion: "homestead"  // Default: "byzantium"
      }
    }
  }
};
