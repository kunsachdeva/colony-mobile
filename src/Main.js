import React, { Component } from 'react';
import {
  Text, View, Image, Dimensions, TextInput, TouchableOpacity, ToastAndroid, ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';


function* statusIterator() {
  yield* ['...CREATING COLONY...', '...SETTING OWNER...', '...MINTING TOKENS...', 'YOU ARE GOOD TO GO 👍'];
}

export default class App extends Component {
  constructor() {
    super()
    this.state = { step: 0, status: 'GOOD CHOICE!', page: 0, balance: 0.0 }
  }

  async componentDidMount() {
    var balance = await this.props.getBalance();
    this.setState(Object.assign(this.state, { balance }))
  }

  render() {
    var { height, width } = Dimensions.get('window');
    return <View>
      {(this.state.page == 0) ? this.renderPage0() : (this.state.page == 1) ? this.renderPage1() : this.renderPage2()}
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
      <Image source={{ uri: 'https://cdn.dribbble.com/users/760333/screenshots/4255615/mr_t2.gif' }} style={{ height: 100, width: 100, resizeMode: 'contain', position: 'absolute', left: 10, top: 0 }} />
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
      <Image source={{ uri: 'https://cdn.dribbble.com/users/760333/screenshots/4255615/mr_t2.gif' }} style={{ height: 100, width: 100, resizeMode: 'contain', position: 'absolute', left: 10, top: 0 }} />
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
}