import React from 'react';
import { StyleSheet, View, ImageBackground, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Button, Form, Item, Label, Input, Icon } from 'native-base';

function a(){
    Alert.alert('hola mundo');
}
function Login(){
    let result = 
        <ImageBackground source={require('../assets/fondo.jpg')} style={styles.container}> 
          <Content padder contentContainerStyle={styles.content}>
            <Card  style={styles.bgCard}>
              <CardItem header style={styles.bgCardItem}>
                <Text style={styles.textCenter}>BIENVENIDOS</Text>
              </CardItem>
              <CardItem style={styles.bgCardItem}>
                <Body style={styles.bodyCard}>
                    <Item floatingLabel>
                      <Icon active name="name" ios='ios-person' android="md-person"/>
                      <Label>Usuario</Label>
                      <Input  />
                    </Item>
                    <Item floatingLabel>
                      <Icon active name="name" ios='ios-lock' android="md-lock"/>
                      <Label>Password</Label>
                      <Input />
                    </Item>
                </Body>
              </CardItem>
              <CardItem footer style={styles.bgCardItem}>
                <Button primary style={styles.button}><Text> Primary </Text></Button>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
    return(result);
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
  button: {
      left: '70%' 
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login