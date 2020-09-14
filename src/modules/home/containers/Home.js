import React, {Component} from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Alert, ActivityIndicator, Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Button, Form, Item, Label, Input, Icon, Left, Right, Title, Picker, Spinner } from 'native-base';
import {decode, encode} from 'base-64'

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
              this.setState({
                  categories: response,
                  isLoading: false
              },()=>{
//                  console.log('seteo la variable');
                  console.log(this.state.categories);
                }
              );
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
//                  console.log('seteo la variable');
                  console.log(this.state.products);
                }
              );
          })
          .catch((error) => {
            console.error(error,"ERRRRRORRR");
          }); 
        this.valToCart();        
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
              },()=>{
//                  console.log('seteo la variable');
                  console.log(this.state.products);
                }
              );
        })
        .catch((error) => {
            console.error(error,"ERRRRRORRR");
        });
      }
    async addToCart(item){
        console.log(item);        
        let cart = [];        
        let value = await AsyncStorage.getItem('@cart');
        if(value){
            cart = null;
            let storage = JSON.parse(value);
            console.log(storage);
            let index = storage.findIndex((e)=>{
                console.log(e.id+' == '+item.id);
                return e.id==item.id
            })
            console.log(index)
            if(index>=0){
                console.log(storage[index]);
                storage[index].quantity = storage[index].quantity+1;
                cart = storage;
            }else{
                item.quantity = 1;
                cart = storage.concat(item);
            }          
            console.log(cart);
        }else{            
            item.quantity = 1;
            cart.push(item); 
        }
        console.log(cart);
        await AsyncStorage.setItem('@cart', JSON.stringify(cart));
        this.setState({
            countCart: cart.length
        });
        
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
                console.log('a')
                count = 0;
            }else{
                console.log('b');
                console.log(count);
                if(count){
                    count = count.length;
                }else{
                    count = 0;
                }
                
            }
            this.setState({ countCart: count },()=>{
                console.log('termino de setear');
            });
        });
    }
    render(){        
        const {navigate} = this.props.navigation;
        console.log('2222')
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
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Title>{products.name}</Title>
                                <Text>
                                {products.name}
                                </Text>
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
const styles = StyleSheet.create({
  bgGray: {
      backgroundColor: '#00148A',
  },
  textCenter: {
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 19
  },
  content: {
      flex: 1,
      justifyContent: 'center',
  },
  bodyCard: {
      borderColor: 'transparent',
      borderStyle: 'dashed',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',     
  },
  bgCardItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderColor: 'transparent',
      borderStyle: 'dashed',
      borderRadius: 0,      
  },
  bgCard: {
    backgroundColor: 'transparent',
    borderRadius: 3,
    height: 320,
    borderColor: 'transparent',
  },
  buttonRight: {
      left: '0%',
  },
  buttonLeft: {
      right: '0%',
      marginRight: 20,
      marginLeft: 20
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
