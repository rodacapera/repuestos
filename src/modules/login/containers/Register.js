import React, {Component} from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Alert } from 'react-native';
import { Header, Content, Card, CardItem, Body, Text, Button, Form, Item, Label, Input, Icon } from 'native-base';

export default class Register extends Component {
    render(){
        const navigate = this.props.navigation;
//        ()=>navigate.goBack()
        let result =                 
            <Content padder contentContainerStyle={styles.content}>
              <StatusBar barStyle="light-content" backgroundColor="#ccc" />
                <Card style={styles.bgCard}>
                  <CardItem header style={styles.bgCardItem}>
                    <Text style={styles.textCenter}>REGISTRARME</Text>
                  </CardItem>
                  <CardItem style={styles.bgCardItem}>
                    <Body style={styles.bodyCard}>
                        <Item floatingLabel>
                          <Icon active name="name" ios='ios-person' android="md-create"/>
                          <Label>Nombres</Label>
                          <Input  />
                        </Item>
                        <Item floatingLabel>
                          <Icon active name="name" ios='ios-person' android="md-create"/>
                          <Label>Apellidos</Label>
                          <Input  />
                        </Item>
                        <Item floatingLabel>
                          <Icon active name="name" ios='ios-person' android="md-mail"/>
                          <Label>Correo</Label>
                          <Input  />
                        </Item>
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
                  <CardItem footer style={[styles.bgCardItem,styles.right]}>
                    <Button primary style={{margin: 10}}><Text> Ingresar </Text></Button>   
                  </CardItem>
                </Card>
            </Content>
        return( result);
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
});