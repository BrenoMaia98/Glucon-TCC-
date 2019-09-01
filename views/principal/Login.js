import React from "react";
import { 
  View,
  Text,
  Button,
} from "react-native";

export default class Login extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Esta é a tela de Login</Text>
        <Button title="Voltar"/>
        <Button title="Logar"/>
      </View>
    );
  }
}