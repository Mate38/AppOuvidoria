import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Picker
} from 'react-native';
import { 
  Button, 
  Title, 
  Text, 
  Form, 
  Item, 
  Label, 
  Input 
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'; // 0.17.0

var fundo = '#387188';
var branco = '#fff';

export default class Manifestacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "selected",
      place: 'Localizando endereço...',
      error: null,
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        }, () => this.getGeocode()); // call the api after getCurrentPosition is finished
      },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 20000 },
     );
    
    }
    getGeocode() {
     axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ this.state.latitude +','+ this.state.longitude +'&key=AIzaSyDtQ0zsYr1c_V7UmlHFekeFIGM2nDwnDEA') // be sure your api key is correct and has access to the geocode api
    .then(response => {
      console.log(response);
        this.setState({
            place: response.data.results[0].formatted_address // access from response.data.results[0].formatted_address
        })
     }).catch((error) => { // catch is called after then
       this.setState({ error: error.message })
     });
  }

  render() {
    return (
      <View style={styles.geral}>
        <Text style={styles.titulo}>Dados da manifestação</Text>
        <ScrollView style={{ flex: 1 }}>

          <View style={{ marginRight: 15 }}>

            <Form style={{ width: 340 }}>
              <Item floatingLabel>
                <Label style={{ color: branco }}>E-mail para resposta</Label>
                <Input />
              </Item>
              <View style={{ marginLeft: 15, borderBottomColor: branco, borderBottomWidth: 1, paddingTop: 20 }}>
                <Picker
                  mode="dialog"
                  style={{ color: branco }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                  itemStyle={{ backgroundColor: 'red' }}
                >
                  <Item label="Selecione a unidade responsável" value="selected" />
                  <Item label="Um" value="key0" />
                  <Item label="Dois" value="key1" />
                  <Item label="Tres" value="key2" />
                  <Item label="Quatro" value="key3" />
                  <Item label="Cinco" value="key4" />
                </Picker>
                <Text>{this.state.user}</Text>
              </View>
              <Item floatingLabel>
                <Label style={{ color: branco }}>Local da ocorrência</Label>
                <Input multiline={true} numberOfLines={4} value={this.state.place.toString()} />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: branco }}>Sua manifestação*</Label>
                <Input multiline={true} numberOfLines={4}/>
              </Item>
            </Form>

          </View>  

          <Button 
            block 
            warning 
            style={{ margin: 35 }}
            onPress={() => { alert("Teste"); }}
            >
            <Text style={{ fontWeight: 'bold' }}>Enviar</Text>
          </Button>   
          
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  geral: {
    flex: 1,
    backgroundColor: fundo,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    top: 10,
    paddingBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: branco,
    //justifyContent: 'flex-start',
  },
});
