import React, {Component} from 'react';
import { StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Header, Button, Icon, Left, Right, Body, Title, Badge, Text } from 'native-base';

export default class HeaderDefault extends Component {
    async validCart(){
        let value = await AsyncStorage.getItem('@cart');
        if(value === null){
            Alert.alert('Tu carrito se encuentra vacío, no olvides agregar tus repuestos.');
        }else{
            this,navigate('Cart')
        }
    }
    render(){
        const {count} = this.props;
        const {navigate} = this.props;
        let content; 
        if(count>0){
            content = <Header style={styles.bgGray}>
                  <Left>
                    <Button transparent>
                      <Icon name='menu' />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Tienda</Title>                    
                  </Body>
                  <Right>
                    <Button transparent onPress={()=>navigate('Cart')}>
                      <Icon name='cart' />
                      <Badge style={styles.badge}>
                        <Text>{count}</Text>
                      </Badge>
                    </Button>
                  </Right>
            </Header>
        }else{
            content = <Header style={styles.bgGray}>
                  <Left>
                    <Button transparent>
                      <Icon name='menu' />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Tienda</Title>                    
                  </Body>
                  <Right>
                    <Button transparent onPress={()=>this.validCart()}>
                      <Icon name='cart' />
                    </Button>
                  </Right>
            </Header>
        }
        return(content)
    } 
}
const styles = StyleSheet.create({
    badge: {
        width: 20,
        height: 20,
        paddingLeft: 0,
        paddingRight: 0
    },
});
