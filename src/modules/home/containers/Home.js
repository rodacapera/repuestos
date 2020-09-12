import React, {Component} from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Alert, ActivityIndicator, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Button, Form, Item, Label, Input, Icon, Left, Right, Title, Picker } from 'native-base';

import HeaderDefault from '../components/Header';

export default class Home extends Component {
    constructor(props){
        super(props);        
        this.state ={
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
                'Authorization': 'Basic '+btoa('administrador:12345678'), 
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
                  console.log(this.state.products);
                }
              );
          })
          .catch((error) => {
            console.error(error,"ERRRRRORRR");
          });
        fetch('http://modablackshop.tk/wp-json/wc/v3/products',{ 
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('administrador:12345678'), 
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
    }
    onValueChange2(value: string) {
        this.setState({
          selected2: value
        });
      }
    render(){
        console.log(this.state.isLoading)
        if(this.state.isLoading){
            return(
                <Container>
                    <HeaderDefault />
                    <ActivityIndicator size="large" color="red" />   
                </Container>      
            )    
        }
        const {navigate} = this.props.navigation;
        let result = 
              <Container>                
                <HeaderDefault />
                <Content>
                    <Item picker>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Select your SIM"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.selected2}
                          onValueChange={this.onValueChange2.bind(this)}
                        >
                          <Picker.Item label="Wallet" value="key0" />
                          <Picker.Item label="ATM Card" value="key1" />
                          <Picker.Item label="Debit Card" value="key2" />
                          <Picker.Item label="Credit Card" value="key3" />
                          <Picker.Item label="Net Banking" value="key4" />
                        </Picker>
                    </Item>
                </Content>
                <Content>
                 {
                    this.state.products.map((products,i) => (
                    
                    <Card style={{flex: 0}} key={i}>
                            <CardItem>
                                <Image source={{uri: products.images[0].src}} style={{height: 200, width: '100%', flex: 1}}/>             
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
                                <Button transparent textStyle={{color: '#87838B'}}>
                                  <Icon name="eye" />
                                  <Text>Ver más</Text>
                                </Button>
                              </Left>
                              <Right>
                                <Button transparent textStyle={{color: '#87838B'}} onPress={()=>this.props.navigation.navigate('Login')}>
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
