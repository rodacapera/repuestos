import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Header, Button, Icon, Left, Right, Body, Title } from 'native-base';

export default class HeaderDefault extends Component {
    render(){
        return(
            <Header style={styles.bgGray}>
                  <Left>
                    <Button transparent>
                      <Icon name='menu' />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Tienda</Title>                    
                  </Body>
                  <Right>
                    <Button transparent onPress={()=>navigate('Login')}>
                      <Icon name='cart' />
                    </Button>
                  </Right>
            </Header>
        )
    }s  
}
const styles = StyleSheet.create({
  bgGray: {
      backgroundColor: '#00148A',
  },
});
