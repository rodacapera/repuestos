import React, {Component} from 'react';
import { StyleSheet, View, Alert, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Form, Item, Label, Input, Icon, Right } from 'native-base';

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
          phone: ""
        };
    }
    async getToCart(){    
        if(!this.state.cart){
            const value = await AsyncStorage.getItem('@cart');
            this.setState({cart: JSON.parse(value), loader: false});
        }
    } 
    pay(){
        console.log('pagar');
        const items = null
        this.state.cart.forEach((value,i)=>{
            items = {product_id: value.id, quantity: value.quantity}
        });
        const data = {
            payment_method: "cod",
            payment_method_title: "Cash on delivery",
            set_paid: true,
            billing: {
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
            shipping: {
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              address_1: this.state.address_1,
              address_2: this.state.address_2,
              city: this.state.city,
              state: this.state.state,
              postcode: this.state.postcode,
              country: this.state.country,
            },
            line_items: [
              {
                product_id: 93,
                quantity: 2
              },
              {
                product_id: 22,
                variation_id: 23,
                quantity: 1
              }
            ],
            shipping_lines: [
              {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: 10
              }
            ]
          };
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
        console.log(this);
        return(
               <Content padder contentContainerStyle={styles.content}>              
                    <Card style={{flex: 0}}>
                        {
                            this.state.cart.map((products,i) => (
                                <CardItem key={i}>
                                  <Image source={{uri: products.images[0].src}} style={{height: 80, width: 80, flex: 1, resizeMode: 'cover', alignSelf: 'stretch'}}/>
                                  <Text style={{width: 150}}>{products.name}</Text>
                                  <Right>
                                    <Text>{products.quantity}</Text>
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
                                <Input  />
                              </Item>
                              <Item floatingLabel style={{marginTop: 10}}>
                                <Icon active name="name" ios='ios-person' android="md-create"/>
                                <Label>Apellidos</Label>
                                <Input  />
                              </Item>
                              <Item floatingLabel style={{marginTop: 10}}>
                                <Icon active name="name" ios='ios-person' android="md-mail"/>
                                <Label>Correo</Label>
                                <Input keyboardType="email-address" />
                              </Item>
                              <Item floatingLabel style={{marginTop: 10}}>
                                <Icon active name="name" ios='ios-person' android="md-person"/>
                                <Label>Identificación</Label>
                                <Input keyboardType="number-pad" />
                              </Item>
                              <Item floatingLabel style={{marginTop: 10}}>
                                <Icon active name="name" ios='ios-lock' android="md-lock"/>
                                <Label>Teléfono</Label>
                                <Input keyboardType="phone-pad" />
                              </Item>
                          </Body>
                        </CardItem>
                        <CardItem footer style={[styles.bgCardItem,styles.right]}>
                          <Button primary style={{margin: 10}}><Text> Comprar </Text></Button>   
                        </CardItem>
                    </Card>
                    
                </Content>
        )
    }
}
const styles = StyleSheet.create({
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
      marginLeft: 40,
      marginRight: 25
  },
  bgCardItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderColor: 'transparent',
      borderStyle: 'dashed',
      borderRadius: 0   
  },
  right: {
    justifyContent: 'flex-end'
  },
  bgCard: {
    borderRadius: 3,
    borderColor: 'transparent',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})