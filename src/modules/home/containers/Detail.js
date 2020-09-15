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
        let cart = [];        
        let value = await AsyncStorage.getItem('@cart');
        if(value){
            cart = null;
            let storage = JSON.parse(value);
            let index = storage.findIndex((e)=>{return e.id==item.id});
            if(index>=0){
                storage[index].quantity = storage[index].quantity+1;
                cart = storage;
            }else{
                item.quantity = 1;
                cart = storage.concat(item);
            }
        }else{            
            item.quantity = 1;
            cart.push(item); 
        }
        await AsyncStorage.setItem('@cart', JSON.stringify(cart));
        this.setState({
            countCart: cart.length
        });
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
                                <Title style={{color: 'green', elevation: 10, position: 'absolute',right: 20, bottom: 2, alignSelf: "center"}}> $ {products.price}</Title>
                            </CardItem>
                            <CardItem>
                                <Body>                                
                                    <Text style={{fontWeight: 'bold', fontSize: 20, textTransform: 'uppercase'}}>
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
