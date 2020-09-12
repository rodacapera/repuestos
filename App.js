import React, {Component} from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleProvider } from "native-base";

import App from "./src/App";

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
        let res =  <App />;
        return(res);
    }
}

export default Autopartes