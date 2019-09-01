import React from "react";
import { 
  View,
  Text,
  Button,
} from "react-native";

export default class MenuOpcoes extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress = {this.props.navigation.push("Resgistros")}>Resgistros</Button>
        <Button onPress = {this.props.navigation.push("Perfil")}>Perfil</Button>
        <Button onPress = {this.props.navigation.push("Config")}>Configurações</Button>
        <Button onPress = {this.props.navigation.goBack()}>Voltar</Button>
      </View>
    );
  }
}