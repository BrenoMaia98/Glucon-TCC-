import React from "react";
import { 
  View,
  Text,
  Button,
} from "react-native";
import BotaoPadrao from '../../components/BotaoPadrao';

export default class Cadastrar extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Tela de inserção de dados numero 1</Text>
        <BotaoPadrao title="Cadastrar" onPress={() => this.props.navigation.navigate("")}></BotaoPadrao>
        <Text onPress={() => alert('this.props.navigation.navigate("")')}>Já possui conta?</Text>
        
      </View>
    );
  }
}