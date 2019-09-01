import React from "react";
import { 
  View,
  Text,
  Button,
} from "react-native";

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Esta é a Home Screen</Text>
        <Button>Menu de operações</Button>
        <Button>Sair</Button>
      </View>
    );
  }
}