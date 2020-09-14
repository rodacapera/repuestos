import React, {Component} from 'react';
import { StyleSheet, View, Alert, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Form, Item, Label, Input, Icon, Left, Right, Title } from 'native-base';

export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state ={
          cart: false,
          loader: true
        };
    }
    async addToCart(item){
        console.log(item);
        let cart = [];        
        let value = await AsyncStorage.getItem('@cart');
        if(value){
            cart = null;
            let storage = JSON.parse(value);
            console.log(storage);
            cart = storage.concat(item);
            console.log(cart);
        }else{
            cart.push(item); 
        }
        console.log(cart);
        await AsyncStorage.setItem('@cart', JSON.stringify(cart));
        this.setState({
            countCart: cart.length
        });
        console.log('redirecionando');
        console.log(this.props.navigation);
        this.props.navigation.navigate('Cart');
    }
    render(){
        const params = [this.props.navigation.state.params.product];
        let result = 
              <Container>
                <Content>
                 {
                    params.map((products,i) => (
                        <Card style={{flex: 0}} key={i}>
                            <CardItem cardBody>
                                <Image source={products.images[0].src?{uri: products.images[0].src}:{uri: 'https://noticiasbancarias.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png'}} style={{height: 200, width: '100%', flex: 1, resizeMode: 'contain', alignSelf: 'stretch'}}/>             
                            </CardItem>
                            <CardItem>
                                <Body>                                
                                    <Text style={{fontWeight: 'bold', fontSize: 28, textTransform: 'uppercase'}}>
                                    {products.name}
                                    </Text>
                                    <Text>
                                    {products.short_description.replace(/<[^>]*>?/g, '')}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                              <Left/>
                              <Right>
                                <Button transparent textStyle={{color: '#87838B'}} onPress={()=>this.addToCart(products)}>
                                  <Icon name="cart" />
                                  <Text>Comprar</Text>
                                </Button>
                              </Right>
                            </CardItem>
                        </Card>
                    ))
                 }        
                </Content>
              </Container>              
        return(result);
    }
}
const styles = StyleSheet.create({
  bgGray: {
      backgroundColor: '#00148A',
  },
});
