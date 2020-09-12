import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Register from './modules/login/containers/Register';
import Login from './modules/login/containers/Login';
import Home from './modules/home/containers/Home';

const LoginNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
            title: 'prueba'
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            headerShown: true,
            title: 'Home',
            headerStyle: {
                backgroundColor: '#C7C8CE',
            },
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
            title: 'prueba'
        }
    }
},
{
    contentComponent: props => <SideBar {...props} />
});
export default createAppContainer(LoginNavigator);  