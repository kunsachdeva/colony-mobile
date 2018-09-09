/* @unsachdeva */
import React, { Component } from 'react';

import {
  Text, TextInput, View
} from 'react-native';
import Main from './src/Main'


import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';
import truffleConfig from './truffle'

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

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()
    this.state = { t: 'fun' }
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
      symbol: tokenName.slice(0,3).toUpperCase(),
    });

    const {
      eventData: { colonyId, colonyAddress },
    } = await networkClient.createColony.send({ tokenAddress });
    console.warn('Colony ID: ' + colonyId);
    return { colonyId, colonyAddress };
  }


  render() {
    return (
      <View>
        <Main setupColony={this.setupColony}/>
      </View>
    );
  }
}