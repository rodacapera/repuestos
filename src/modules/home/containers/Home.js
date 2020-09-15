import React, {Component} from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Alert, ActivityIndicator, Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Button, Form, Item, Label, Input, Icon, Left, Right, Title, Picker, Spinner, H1 } from 'native-base';
import {decode, encode} from 'base-64';

import HeaderDefault from '../components/Header';

export default class Home extends Component {
    constructor(props){
        super(props);        
        this.state ={
          countCart: 0, 
          products: [],
          categories: [],
          isLoading: true,
          selected2: undefined
        };
    }
    componentDidMount = () => {        
        fetch('http://modablackshop.tk/wp-json/wc/v3/products/categories',{ 
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Basic '+encode('administrador:12345678'), 
                'Content-Type': 'application/x-www-form-urlencoded'
            }), 
        })
        .then(response => {              
              return response.json();
        })
        .then(response =>{
            this.setState({categories: response});
        })
        .catch((error) => {
            console.error(error,"ERRRRRORRR");
          });
        fetch('http://modablackshop.tk/wp-json/wc/v3/products?per_page=100',{ 
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Basic '+encode('administrador:12345678'), 
                'Content-Type': 'application/x-www-form-urlencoded'
            }), 
        })
          .then(response => {              
              return response.json();
          })
          .then(response =>{
              this.setState({
                  products: response, 
                  isLoading: false
              },()=>{
                  this.valToCart();            
                }
              );
          })
          .catch((error) => {
            console.error(error,"ERRRRRORRR");
          }); 
                
    }    
    onValueChange2(value) {
        this.setState({isLoading: true });      
        fetch('http://modablackshop.tk/wp-json/wc/v3/products?category='+value,{ 
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Basic '+encode('administrador:12345678'), 
                'Content-Type': 'application/x-www-form-urlencoded'
            }), 
        })
        .then(response => {              
              return response.json();
        })
        .then(response =>{
              this.setState({
                  products: response,
                  isLoading: false,
                  selected2: value
              });
        })
        .catch((error) => {
            console.error(error,"ERRRRRORRR");
        });
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
        this.setState({countCart: cart.length});
    }
    async valToCart(){
       if(!this.state.countCart){
            const value = await AsyncStorage.getItem('@cart');
            if(value !== null) {
              this.setState({
                 countCart: JSON.parse(value).length
              },()=>{
                  console.log('seteo contCart');
                  console.log(this.state.countCart);
              });
            }
        }
        this.props.navigation.addListener('didFocus', async () => {
            let count = JSON.parse(await AsyncStorage.getItem('@cart'));
            if(count && count.length==0){
                count = 0;
            }else{
                if(count){
                    count = count.length;
                }else{
                    count = 0;
                }
            }
            this.setState({ countCart: count });
        });
    }
    render(){        
        const {navigate} = this.props.navigation;
        if(this.state.isLoading){
            return(
                <Container>
                    <HeaderDefault />
                    <ActivityIndicator size="large" color="red" />   
                </Container>      
            )    
        }
        let result = 
              <Container>                
                <HeaderDefault count={this.state.countCart} navigate={navigate}/>
                    <Form>
                        <Item picker>
                            <Picker
                              style={{ width: undefined }}
                              selectedValue={this.state.selected2}
                              onValueChange={this.onValueChange2.bind(this)}
                            >
                            {
                                this.state.categories.map((categories,i) => (
                                    <Picker.Item label={categories.name} value={categories.id} key={i} />
                                ))
                            }
                            </Picker>
                        </Item>
                    </Form>
                <Content>
                 {
                    this.state.products.map((products,i) => (
                    <Card style={{flex: 0}} key={i}>
                        <CardItem cardBody>
                            <Image source={products.images[0].src?{uri: products.images[0].src}:{uri: 'https://noticiasbancarias.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png'}} style={{height: 200, width: '100%', flex: 1, resizeMode: 'contain', alignSelf: 'stretch'}}/>             
                            <Title style={{color: 'green', elevation: 10, position: 'absolute',right: 20, bottom: 2, alignSelf: "center"}}> $ {products.price}</Title>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <H1>{products.name}</H1>                               
                            </Body>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Button transparent textStyle={{color: '#87838B'}} onPress={()=>this.props.navigation.navigate('Detail',{product: products})}>
                              <Icon name="eye" />
                              <Text>Ver más</Text>
                            </Button>
                          </Left>
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