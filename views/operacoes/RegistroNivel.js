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
        <Text> Esta daqui é a tela de Registros</Text>
        <Button onPress = {this.props.navigation.goBack()}>Voltar</Button>
      </View>
    );
  }
}