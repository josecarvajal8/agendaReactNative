
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  YellowBox,
  ImageBackground,
  Dimensions
} from 'react-native';

import _ from 'lodash';

import Firebase from './src/lib/firebase';

import NavBarView from './src/components/NavBarView';
import Schedule from './src/components/Schedule';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    /*
    *@Jose Carvajal
    * Inicializando la conexión con Firebase
    */
    Firebase.init()

  }
  render() {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    return (

      <ImageBackground style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }} source={require('./src/assets/bgretoalmundo.png')}>
        <View>
          <NavBarView />
          <Schedule />
        </View>
      </ImageBackground>
    );
  }
}

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
