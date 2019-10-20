import React from "react";
import { 
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

import BotaoPadrao from '../../components/BotaoPadrao';
import {font} from '../../assets/estilos/styles';
var {height, width} = Dimensions.get('window');

export default class Home extends React.Component {
  render() {
    return (
      <ImageBackground
      source={require("../../assets/img/background/bgLuzesInverso.jpg")}
      style={styles.bgImage}
      >
            <View style={styles.container}>
              <Text style={[font.jam,{fontSize:60}]}>DM Control</Text>
              <Text style={font.titulo}> Diabetes Mellitus Controler</Text>
              <BotaoPadrao
                onPress={() => this.props.navigation.navigate("Login")
                }
                title="Entrar"
                wid={30}
                font={font.btnTextoPequeno}
              ></BotaoPadrao>
              <BotaoPadrao
                onPress={() => this.props.navigation.navigate("Cadastrar")
                }
                title="Cadastrar-se"
                wid={45}
                font={font.btnTextoPequeno}
              ></BotaoPadrao>
            </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  bgImage: {
    zIndex:-999,
    height:height,
  },
  container: {
    zIndex:1,
    opacity:1,
    height:height,
    alignItems: "center", 
    justifyContent: "space-around",
  },
  
});
