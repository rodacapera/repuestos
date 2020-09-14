import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Register from './modules/login/containers/Register';
import Login from './modules/login/containers/Login';
import Home from './modules/home/containers/Home';
import Detail from './modules/home/containers/Detail';
import Cart from './modules/cart/containers/Cart';

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
                backgroundColor: '#C7C8CE'
            },
        }
    },
    Home: {
        screen: Home,
        onGoBack: (param)=>{
            console.log('sssssss');
            console.log(param);
        },
        navigationOptions: {
            headerShown: false,
            title: 'prueba'
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            headerShown: true,
            title: 'Volver',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'rgb(63, 81, 181)'
            },
        }
    },
    Cart: {
        screen: Cart,
        navigationOptions: {
            headerShown: true,
            title: 'Volver',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'rgb(63, 81, 181)'
            },
        }
    }
},
{
    contentComponent: props => <SideBar {...props} />
});
export default createAppContainer(LoginNavigator);  