import React, {Component} from 'react';
import { StyleSheet, View, Alert, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Form, Item, Label, Input, Icon, Badge, Right } from 'native-base';
import {decode, encode} from 'base-64';
var WooCommerceAPI = require('react-native-woocommerce-api');

const WooCommerce = new WooCommerceAPI({
       url: 'http://modablackshop.tk/',
       consumerKey: 'ck_2d8f90d8f645239ad5ad73d93348f0484c159188',
       consumerSecret: 'cs_84d6ea062b5846e0105c83e87f436bf6856cdfe6',
       wpAPI: true,
       version: 'wc/v3',
       queryStringAuth: true
});
export default class Cart extends Component {
    constructor(props){
        super(props);        
        this.state ={
          cart: false,
          loader: true,
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "Bogotá",
          state: "CU",
          postcode: "110011",
          country: "CO",
          email: "",
          phone: "",          
          line_items: [],
          shipping_lines:[{
              method_id: "",
              method_title: "",
              total: ""
          }]
        };
    }
    async getToCart(){    
        if(!this.state.cart){
            const value = await AsyncStorage.getItem('@cart');
            this.setState({cart: JSON.parse(value), loader: false});
        }
    } 
    async delete(id){
        const value = JSON.parse(await AsyncStorage.getItem('@cart'));
        let index = value.findIndex((e)=>{return e.id==id});
        if(index !== -1){
            value.splice(index, 1);
        }
        if(value.length<=0){
            await AsyncStorage.removeItem('@cart');
            this.props.navigation.goBack();
        }else{
            await AsyncStorage.setItem('@cart', JSON.stringify(value));
        }
        this.setState({cart: value, loader: false, countCart: value.length});
    }
    async pay(){        
        const value = JSON.parse(await AsyncStorage.getItem('@cart'));
        const items = null
        value.forEach((value,i)=>{this.state.line_items.push({product_id: value.id, quantity: value.quantity});});
        const data = {
            payment_method: "cod",
            payment_method_title: "Cash on delivery",
            set_paid: true,
            billing: {//datos de factura
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              address_1: this.state.address_1,
              address_2: this.state.address_2,
              city: this.state.city,
              state: this.state.state,
              postcode: this.state.postcode,
              country: this.state.country,
              email: this.state.email,
              phone: this.state.phone
            },
            shipping: {//datos del envio
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              address_1: this.state.address_1,
              address_2: this.state.address_2,
              city: this.state.city,
              state: this.state.state,
              postcode: this.state.postcode,
              country: this.state.country,
            },
            line_items: this.state.line_items//productos comprados,
          };
        WooCommerce.post('orders', data)
        .then(data => {
            this.setData();
        })
        .catch(error => {
            console.log(error);
        });
    }
    async setData(){
       await AsyncStorage.removeItem('@cart');
       this.setState({
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "Bogotá",
          state: "CU",
          postcode: "110011",
          country: "CO",
          email: "",
          phone: "",          
          line_items: [],
          shipping_lines:{
              method_id: "",
              method_title: "",
              total: ""
          }
       });
       this.props.navigation.goBack();
    }
    render(){
        this.getToCart();
        const {navigate} = this.props.navigation;
        if(this.state.loader){
            return(
                <Container>
                    <ActivityIndicator size="large" color="red" />   
                </Container>      
            )    
        }
        return(
               <Content padder contentContainerStyle={styles.content}>              
                    <Card style={{flex: 0}}>
                        {
                            this.state.cart.map((products,i) => (
                                <CardItem key={i}>
                                  <Image source={{uri: products.images[0].src}} style={{height: 80, width: 80, flex: 1, resizeMode: 'cover', alignSelf: 'stretch'}}/>
                                  <Button transparent style={{marginTop: 16}} onPress={()=>this.delete(products.id)}>
                                        <Icon name="trash" style={{color: 'red'}} />
                                  </Button>   
                                  <Text style={{width: 150}}>{products.name}</Text>
                                  <Badge success style={{width: 20, height: 20, paddingLeft: 0, paddingRight: 0}}>
                                    <Text>{products.quantity}</Text>
                                  </Badge>
                                  <Right>
                                    <Button transparent textStyle={{color: '#87838B'}} onPress={()=>this.props.navigation.navigate('Detail',{product: products})}>
                                        <Icon name="arrow-forward" />
                                    </Button>                                    
                                  </Right>
                                </CardItem>
                            ))  
                        }                        
                    </Card>  
                    <Card style={styles.bgCard}>
                        <CardItem header style={styles.bgCardItem}>
                          <Text style={styles.textCenter}>DATOS DE LA COMPRA</Text>
                        </CardItem>
                        <CardItem>
                          <Text>Diligencia toda la información correspondiente para efectuar tu compra.</Text>
                        </CardItem>
                        <CardItem style={styles.bgCardItem}>                          
                          <Body style={styles.bodyCard}>
                              <Item floatingLabel style={{marginTop: 10}}>
                                <Icon active name="name" ios='ios-person' android="md-create"/>
                                <Label>Nombres</Label>
                                <Input onChangeText={(text) =>{this.state.first_name = text}} />
                              </Item>
                              <Item floatingLabel style={{marginTop: 10}}>
                                <Icon active name="name" ios='ios-person' android="md-create"/>
                                <Label>Apellidos</Label>
                                <Input onChangeText={(text) =>{this.state.last_name = text}} />
                              </Item>
                              <Item floatingLabel style={{marginTop: 10}}>
                                <Icon active name="name" ios='ios-person' android="md-mail"/>
                                <Label>Correo</Label>
                                <Input keyboardType="email-address" onChangeText={(text) =>{this.state.email = text}} />
                              </Item>
                              <Item floatingLabel style={{marginTop: 10}}>
                                <Icon active name="name" ios='ios-person' android="md-person"/>
                                <Label>Identificación</Label>
                                <Input keyboardType="number-pad" />
                              </Item>
                              <Item floatingLabel style={{marginTop: 10}}>
                                <Icon active name="name" ios='ios-lock' android="md-lock"/>
                                <Label>Teléfono</Label>
                                <Input keyboardType="phone-pad" onChangeText={(text) =>{this.state.phone = text}} />
                              </Item>
                          </Body>
                        </CardItem>
                        <CardItem footer style={[styles.bgCardItem,styles.right]}>
                          <Button primary style={{margin: 10}} onPress={()=>this.pay()}><Text> Comprar </Text></Button>   
                        </CardItem>
                    </Card>
                    
                </Content>
        )
    }
}
const styles = StyleSheet.create({
  badge: {
        width: 20,
        height: 20,
        paddingLeft: 0,
        paddingRight: 0,
        color: 'green'
  }
})