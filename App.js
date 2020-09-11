import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Login from './src/Login';
import Home from './src/Home';
import Carrito from './src/Carrito';

class Autopartes extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
        };
    }
    
    async componentDidMount() {
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        this.setState({ isReady: true });
      }

    render(){
        if (!this.state.isReady) {
            return <AppLoading />;
        }        
        
        let result =
           <Login />
        
        return(result)
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Autopartes
