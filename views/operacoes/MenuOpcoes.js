import React from "react";
import { 
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";

import BotaoPadrao from '../../components/BotaoPadrao';
import {font} from '../../assets/estilos/styles';
var {height,width} = Dimensions.get('window');

export default class MenuOpcoes extends React.Component {
  render() {
    return (
      <ImageBackground
      source={require("../../assets/img/background/bgoperacoes.jpg")}
      style={styles.bgImage}
      >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
          <Text style={{fontFamily:"Jam",fontSize:50}}>Operações</Text>
          <BotaoPadrao
                  onPress={() => this.props.navigation.navigate("Estatisticas")
                }
                  title="Visão Geral"
                  wid={55}
                  font={[font.btnTextoGrande,{fontFamily:"Jam",padding:10}]}
          ></BotaoPadrao>
          <BotaoPadrao
                  onPress={() => this.props.navigation.navigate("Registro")
                }
                title="Novo Registro"
                wid={55}
                  font={[font.btnTextoGrande,{fontFamily:"Jam",padding:10}]}
                  ></BotaoPadrao>
          <BotaoPadrao
                  onPress={() => this.props.navigation.navigate("Refeicao")
                  }
                  title="Refeição"
                  wid={55}
                  font={[font.btnTextoGrande,{fontFamily:"Jam",padding:10}]}
          ></BotaoPadrao>
          <BotaoPadrao
                  onPress={() => this.props.navigation.navigate("Perfil")
                }
                title="Perfil"
                wid={55}
                  font={[font.btnTextoGrande,{fontFamily:"Jam",padding:10}]}
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
});