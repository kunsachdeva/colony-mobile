/* @unsachdeva */
import React, { Component } from 'react';

import {
  Text, TextInput, View
} from 'react-native';
import Main from './src/Main'


import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';
import truffleConfig from './truffle'
const web3Provider = new HDWalletProvider(MNEMONIC, 'http://10.0.7.250:8545/');

//Add this file with `MY_ADDRESS` and `MY_ADDRESS` as Strings
import { MNEMONIC } from './constants'

const colonyArtifact = require('./ColonyNetwork.json');
const contract = require('truffle-contract');
const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');

const { default: ColonyNetworkClient } = require('@colony/colony-js-client');

const loader = new TrufflepigLoader();

const provider = new providers.JsonRpcProvider('http://10.0.7.250:8545/');
const proxy = contract(require('@gnosis.pm/dx-contracts/build/contracts/DutchExchangeProxy'));
const dutchExchange = contract(require('@gnosis.pm/dx-contracts/build/contracts/DutchExchange'));
const web3 = new Web3(web3Provider);
dutchExchange.setProvider(web3.currentProvider);
proxy.setProvider(web3.currentProvider);
console.disableYellowBox = true;
type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()
  }

  async getBalance() {
    const { privateKey } = await loader.getAccount(0);

    const wallet = new Wallet(privateKey, provider);

    return ((await wallet.getBalance()) * 1e-18)
  }

  async getAddress() {
    const { privateKey } = await loader.getAccount(0);

    const wallet = new Wallet(privateKey, provider);

    return wallet.address;
  }

  dutchEx(sellTokenAddress, buyTokenAddress, sellAmount) {
    return new Promise(resolve, reject) = () => {
      proxy.deployed().then(proxy => {
        const proxyHACK = proxy.address;//'0xd78Ae0828deda8995076175Ea5A388E8E5b9F0c1';
        const dx = dutchExchange.at(proxyHACK); 
        dx.depositAndSell.sendTransaction(sellTokenAddress, buyTokenAddress, sellAmount * 1e18, { from: await this.getAddress() })
          .then((d)=>resolve(d))
          .catch((e)=>reject(e))
      })
    }
  }

  async setupColony(tokenName) {
    const { privateKey } = await loader.getAccount(0);

    const wallet = new Wallet(privateKey, provider);

    const adapter = new EthersAdapter({
      loader,
      provider,
      wallet,
    });

    // Connect to ColonyNetwork with the adapter!
    const networkClient = new ColonyNetworkClient({ adapter });
    await networkClient.init();
    const tokenAddress = await networkClient.createToken({
      name: tokenName,
      symbol: tokenName.slice(0, 3).toUpperCase(),
    });

    const {
      eventData: { colonyId, colonyAddress },
    } = await networkClient.createColony.send({ tokenAddress });
    console.warn('Colony ID: ' + colonyId);

    // Make the colony contract the owner of the token
    await colonyClient.token.setOwner.send({ owner: colonyClient.contract.address });

    // Add yourself as an admin
    await colonyClient.authority.setUserRole.send({ user: wallet.address, role: 'ADMIN' });

    // Mint some tokens
    await colonyClient.mintTokens.send({ amount: new BigNumber(1000) });


    return { colonyId, colonyAddress };
  }

  render() {
    return (
      <View>
        <Main setupColony={this.setupColony} getBalance={this.getBalance} dx={this.dutchEx} />
      </View >
    );
  }
}