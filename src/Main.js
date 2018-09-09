import React, { Component } from 'react';
import {
  Text, View, Image, Dimensions, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Picker
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { RDN_ADDRESS, WETH_ADDRESS } from './constants'

function* statusIterator() {
  yield* ['...CREATING COLONY...', '...SETTING OWNER...', '...MINTING TOKENS...', 'YOU ARE GOOD TO GO 👍'];
}

export default class App extends Component {
  constructor() {
    super()
    this.state = { step: 0, status: 'GOOD CHOICE!', page: 0, balance: 0.0, loading: false }
  }

  async componentDidMount() {
    var balance = await this.props.getBalance();
    this.setState(Object.assign(this.state, { balance }))
  }

  render() {
    var { height, width } = Dimensions.get('window');
    return <View>
      {(this.state.page == 0) ? this.renderPage0() : (this.state.page == 1) ? this.renderPage1() : (this.state.page == 2) ? this.renderPage2() : this.renderPage3()}
    </View>
  }

  submitName(e) {
    var statuses = statusIterator();
    var name = e.nativeEvent.text;
    if (name.length > 0) {
      this.props.setupColony(name)
      this.setState(Object.assign(this.state, { step: 1 }))
      var interval = setInterval(() => {
        var status = statuses.next().value;
        if (status)
          this.setState(Object.assign(this.state, { status }))
        else {
          clearInterval(interval)
          ToastAndroid.show('Passphrase copied', ToastAndroid.LONG);
          this.setState(Object.assign(this.state, { step: 2 }))
        }
      }, 2000)
    }
  }

  renderPage0() {
    var { height, width } = Dimensions.get('window');
    return <View style={{ height, width, backgroundColor: '#ccdac9', alignItems: 'center', padding: 50 }}>
      <Image source={require('./logo.png')} style={{ height: 50, width: 200, resizeMode: 'contain', marginBottom: 100 }} />
      {(this.state.step == 0) ? <Text style={{ width: width - 100, fontSize: 20, fontWeight: 'bold', letterSpacing: 0 }}>NAME YOUR COLONY</Text> : null}
      {(this.state.step == 1) ? <Animatable.Text animation="fadeInUp" iterationCount={10} direction="alternate"
        style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{this.state.status}</Animatable.Text> : null}
      {(this.state.step == 2) ? <Animatable.View animation="fadeInUp" direction="alternate" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>This is your UNIQUE passphrase</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Paste it somewhere SAFE</Text>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '100', backgroundColor: 'rgba(0,0,0,0.1)', padding: 5, paddingHorizontal: 10, margin: 5, borderRadius: 5 }}>OCTUPUS HELLO</Text>
        <TouchableOpacity onPress={() => this.setState(Object.assign(this.state, { step: 0, page: 1 }))} style={{ padding: 5, borderColor: 'grey', borderWidth: 2, marginTop: 5 }}>
          <Text>DONE</Text>
        </TouchableOpacity>
      </Animatable.View> : null}
      {(this.state.step == 0) ? <TextInput
        placeholder='MrT'
        style={{ width: width - 100, fontSize: 28, opacity: 0.5, paddingLeft: 0 }}
        underlineColorAndroid={'transparent'}
        onSubmitEditing={this.submitName.bind(this)}
      /> : null}
      <Image source={{ uri: 'https://cdn.dribbble.com/users/704758/screenshots/4457572/neature2.jpg' }} style={{ width, height: 300, resizeMode: 'contain', position: 'absolute', bottom: -25, left: 0, zIndex: -1 }} />
    </View>
  }

  renderPage1() {
    var { height, width } = Dimensions.get('window');
    return <View style={{ height, width, alignItems: 'center', paddingHorizontal: 50, paddingVertical: 10, backgroundColor: 'white' }}>
      <TouchableOpacity style={{ height: 100, width: 100, position: 'absolute', left: 10, top: 0 }} onPress={()=>{this.setState(Object.assign(this.state, { page: 2 }))}}>
        <Image source={{ uri: 'https://cdn.dribbble.com/users/760333/screenshots/4255615/mr_t2.gif' }} style={{ height: 100, width: 100, resizeMode: 'contain'}} />
      </TouchableOpacity>
      <Text style={{ fontSize: 36, fontWeight: '100', letterSpacing: 0, letterSpacing: -4, marginTop: 10, color: 'rgb(90,90,90)' }}>{'Marketing ▼'}</Text>
      <TouchableOpacity style={{ height: 60, width: 45, padding: 10, borderColor: 'gainsboro', borderWidth: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 30, top: 20 }}>
        <Image source={{ uri: 'http://iconshow.me/media/images/ui/ios7-icons/png/256/plus-empty.png' }} style={{ height: 60, width: 60, resizeMode: 'contain', opacity: 0.5 }} />
      </TouchableOpacity>
      <View style={{ height: 2, width: width - 30, backgroundColor: 'gainsboro', marginTop: 25 }}></View>
      <ScrollView style={{ width }} horizontal={true}>
        {this.renderTaskItem('#8BC34A', ['Write article ✒️ about Mr. T', 'Use conditioner before shampoo'])}
        {this.renderTaskItem('#4CAF50', ['Super 🕶️ secret task', 'Send new posters 🖼️'])}
      </ScrollView>
      <Image source={{ uri: 'https://cdn.dribbble.com/users/1720999/screenshots/3747912/bikini-bottom-png-ps-small.png' }} style={{ width, height: 300, resizeMode: 'contain', position: 'absolute', bottom: -46, left: 0, zIndex: -1 }} />
    </View>
  }

  renderTaskItem(c, t) {
    var { height, width } = Dimensions.get('window');
    return <View style={{ height: height - 200, width: 300, backgroundColor: c, elevation: 10, margin: 30, marginRight: 0, borderRadius: 10 }}>
      <View style={{ padding: 20, paddingBottom: 15, borderBottomColor: 'rgb(250,250,250)', borderBottomWidth: 1 }}>
        <View style={{ flexDirection: 'row', marginBottom: 5, opacity: 0.7 }}>
          <Image source={{ uri: 'https://www.iconsdb.com/icons/preview/white/time-4-xxl.png' }} style={{ height: 15, width: 15, resizeMode: 'contain', marginRight: 5 }} />
          <Text style={{ color: 'rgb(255,255,255)', fontSize: 12, fontWeight: 'bold' }}>{(Math.random() * 100).toString().slice(0, 2)}h</Text>
        </View>
        <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontWeight: 'bold' }}>{t[0]}</Text>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text style={{ color: 'white', padding: 3, paddingHorizontal: 6, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 3, marginRight: 5 }}>Priority</Text>
          <Text style={{ color: 'white', padding: 3, paddingHorizontal: 6, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 3, marginRight: 5 }}>Interior</Text>
        </View>
        <Text style={{ color: 'rgb(255,255,255)', fontSize: 12, fontWeight: '100' }}>0.3 MrT</Text>
        <Text style={{ color: 'rgb(255,255,255)', fontSize: 12, fontWeight: '100' }}>1.22 CLNY</Text>
      </View>
      <View style={{ padding: 20, paddingBottom: 15, borderBottomColor: 'rgb(250,250,250)', borderBottomWidth: 1 }}>
        <View style={{ flexDirection: 'row', marginBottom: 5, opacity: 0.7 }}>
          <Image source={{ uri: 'https://www.iconsdb.com/icons/preview/white/time-4-xxl.png' }} style={{ height: 15, width: 15, resizeMode: 'contain', marginRight: 5 }} />
          <Text style={{ color: 'rgb(255,255,255)', fontSize: 12, fontWeight: 'bold' }}>{(Math.random() * 100).toString().slice(0, 2)}h</Text>
        </View>
        <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontWeight: 'bold' }}>{t[1]}</Text>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text style={{ color: 'white', padding: 3, paddingHorizontal: 6, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 3, marginRight: 5 }}>Priority</Text>
          <Text style={{ color: 'white', padding: 3, paddingHorizontal: 6, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 3, marginRight: 5 }}>Interior</Text>
        </View>
        <Text style={{ color: 'rgb(255,255,255)', fontSize: 12, fontWeight: '100' }}>0.3 MrT</Text>
        <Text style={{ color: 'rgb(255,255,255)', fontSize: 12, fontWeight: '100' }}>1.22 CLNY</Text>
      </View>
    </View>
  }

  renderPage2() {
    var { height, width } = Dimensions.get('window');
    return <View style={{ height, width, alignItems: 'center', paddingHorizontal: 50, paddingVertical: 10, backgroundColor: 'white' }}>
      <Image source={{ uri: 'https://static.thenounproject.com/png/390380-200.png' }} style={{ height: 100, width: 50, resizeMode: 'contain', position: 'absolute', left: 10, top: 0 }} />
      <Text style={{ fontSize: 36, fontWeight: '100', letterSpacing: 0, marginTop: 10, color: 'rgb(90,90,90)' }}>{'Wallet'}</Text>
      <TouchableOpacity style={{ height: 60, width: 45, padding: 10, borderColor: 'gainsboro', borderWidth: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 30, top: 20 }}>
        <Image source={{ uri: 'http://iconshow.me/media/images/ui/ios7-icons/png/256/plus-empty.png' }} style={{ height: 60, width: 60, resizeMode: 'contain', opacity: 0.5 }} />
      </TouchableOpacity>
      <View style={{ height: 2, width: width - 30, backgroundColor: 'gainsboro', marginVertical: 25 }}></View>
      <Text style={{ width: width - 30, fontSize: 16, fontWeight: 'bold' }}>Balances</Text>
      <View style={{ width: width - 30, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{'ETH  ' + this.state.balance}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ height: 30, width: 90, backgroundColor: 'grey', position: 'relative', top: -5, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, flexDirection: 'row' }}>
            <Image source={{ uri: 'https://gnosis.pm/assets/img/index/gnosis-apps-slider/dutchx_thumb_mgn.png' }} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
            <Text style={{ color: 'white' }}>DutchX</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={'RDN'}
            style={{ height: 50, width: 110, position: 'relative', top: -15, left: 10 }}>
            <Picker.Item label="WETH" value="WETH" />
            <Picker.Item label="RDN" value="RDN" />
          </Picker>
        </View>
      </View>
      <View style={{ width: width - 30, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{'MRT  ' + '3.003'}</Text>
      </View>
      <View style={{ width: width - 30, marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{'RDN  ' + this.state.RND_balance}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.dutchX.bind(this)} style={{ height: 30, width: 90, backgroundColor: (this.state.loading) ? 'darkgrey' : 'grey', position: 'relative', top: -5, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, flexDirection: 'row' }}>
            {(this.state.loading) ? <Image source={require('./source.gif')} style={{ height: 20, width: 20, resizeMode: 'contain' }} /> : <Image source={{ uri: 'https://gnosis.pm/assets/img/index/gnosis-apps-slider/dutchx_thumb_mgn.png' }} style={{ height: 20, width: 20, resizeMode: 'contain' }} />}
            <Text style={{ color: 'white' }}>DutchX</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={'WETH'}
            style={{ height: 50, width: 110, position: 'relative', top: -15, left: 10 }}>
            <Picker.Item label="WETH" value="WETH" />
            <Picker.Item label="GNO" value="GNO" />
            <Picker.Item label="RDN" value="RDN" />
          </Picker>
        </View>
      </View>
      <Image source={{ uri: 'https://cdn.dribbble.com/users/1720999/screenshots/3747912/bikini-bottom-png-ps-small.png' }} style={{ width, height: 300, resizeMode: 'contain', position: 'absolute', bottom: -46, left: 0, zIndex: -1 }} />
    </View>
}

  dutchX() {
    this.setState(Object.assign(this.state, { loading: true }))
    this.props.dx(RDN_ADDRESS, WETH_ADDRESS, RND_balance)
    .then(()=>this.setState(Object.assign(this.state, { loading: false })))
  }

}
