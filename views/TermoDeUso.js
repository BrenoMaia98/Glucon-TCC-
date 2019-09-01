import React from "react";
import {
  StyleSheet, 
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native";
import {  Button, Card, CardItem, } from 'native-base';
import BotaoPadrao from '../components/BotaoPadrao';

var {height, width} = Dimensions.get('window');

export default class TermoDeUso extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ImageBackground source={require('../assets/img/background/bgLuzes.jpg')} style={styles.container}>
        <Text style={{fontFamily: 'Amita-Bold', fontSize:26}}>Termo de Responsabilidade</Text>
          <View style={
          { width: width *0.8 ,
            height: height * 0.6,
            borderRadius:40,
            borderWidth: 1,
            backgroundColor: "white",
            borderColor: '#777',
            padding:30,
            display:'flex',
          }}>
          <ScrollView  showsVerticalScrollIndicator={true} persistentScrollbar={true}>
              <Text style={{fontSize:19, textAlign:'justify'}}>
                Este aplicativo foi desenvolvido para auxiliar pacientes que sofrem da doença Diabetes Mellitus e necessitam de assistência em cálculos de carboidratos, doses de insulina, regulamentação de uma dieta e manter registros tanto de refeições como de níveis de glicemia em forma de histórico.
              </Text>
              <Text style={{fontSize:19, textAlign:'justify'}}>
                O aplicativo não tem qualquer responsabilidade pela inserção de dados falsos pelo usuário, que podem prejudicar o funcionamento correto de algumas funcionalidades e/ou prejudicar a saúde do paciente.
              </Text>
              <Text style={{fontSize:19, textAlign:'justify'}}>
                Um profissional de saúde é indispensável no acompanhamento do tratamento e na validação das doses sugeridas pelo aplicativo.
              </Text>
          </ScrollView>
          </View>
          <View style ={{paddingHorizontal: 40, paddingVertical: 10,}}>
            <Text style={{fontSize:18, textAlign:'justify'}}>Você esta ciente e concorda com termos e condições acima?</Text>
          </View>
          <View style={{
            flexDirection: 'row', 
            alignItems: 'space-around',
            justifyContent:'space-around',
            width:width,
          }}>
            <BotaoPadrao title="Sim" onPress={() => this.props.navigation.navigate("Cadastrar")}></BotaoPadrao>
            <BotaoPadrao title="Não" onPress={() => alert("queria fecha o app...")}></BotaoPadrao>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    paddingTop: height * 0.05,
    zIndex:-999,
    flex:1,
    textAlign:'center',
    flexDirection: 'column',
    alignItems: 'center',

  },
});