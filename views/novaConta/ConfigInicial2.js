import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView
} from "react-native";
import { Form, Item, Input, Alert } from "native-base";

import BotaoPadrao from "../../components/BotaoPadrao";
import { font, colors } from "../../assets/estilos/styles";

var { height, width } = Dimensions.get("window");
export default class ConfigInicial1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hipoglicemia: " ",
      hiperglicemia: " ",
      minIdeal: "",
      maxIdeal: "",
      tipo: "",
      niveis: undefined
    };
  }
  _verificarDados() {
    if (
      this.state.hipoglicemia != " " &&
      this.state.hipoglicemia != "" &&
      this.state.Hiperglicemia != " " &&
      this.state.Hiperglicemia != " " &&
      this.state.tipo != ""
    ) {
      if (this.state.niveis == false) {
        Alert.alert("Sucesso", "Seu cadastro foi concluido com sucesso");
        this.props.navigation.navigate("Login");
      } else {
        this.props.navigation.navigate("ConfigInicial2");
      }
    }
  }
  render() {
    return (
      <ImageBackground
      source={require("../../assets/img/background/bgLuzes2.jpg")}
      style={styles.bgImage}
      >
            <View style={styles.container}>
          <ScrollView>
              <Text style={font.titulo}>Configurações Iniciais</Text>
              <View style={{width:width*0.9, alignItems:"flex-end"}}>
                <BotaoPadrao
                  onPress={() =>
                    this.state.niveis
                    ? this._verificarDados
                    : this.props.navigation.navigate("ConfigInicial2")
                  }
                  title="Ajuda"
                  wid={30}
                  font={font.s20}
                  ></BotaoPadrao>
              </View >
              <Form style={styles.forms}> 
                <Item style={styles.formItem} >
                  <Text style={[font.amita, { fontSize: 20 }]}>
                    Hipoglicemia :
                  </Text>
                  <Input
                    onChangeText={hipoglicemia =>
                      this.setState({ hipoglicemia })
                    }
                  />
                </Item>
                <Item style={styles.formItem}>
                  <Text style={[font.amita, { fontSize: 20 }]}>
                    Hiperglicemia :
                  </Text>
                  <Input
                    onChangeText={hiperglicemia => this.setState({ hiperglicemia })}
                  />
                </Item>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  Intervalo ideal para o nível de glicemia:{" "}
                </Text>
                <Item style={styles.formItem}>
                  <Text style={[font.amita, { fontSize: 20 }]}>
                    Mínimo ideal :
                  </Text>
                  <Input
                    secureTextEntry={true}
                    onChangeText={hiperglicemia =>this.setState({ hiperglicemia }) }
                  />
                </Item>
                <Item style={styles.formItem}>
                  <Text style={[font.amita, { fontSize: 20 }]}>
                    Máximo ideal :
                  </Text>
                  <Input
                    secureTextEntry={true}
                    onChangeText={hiperglicemia =>
                      this.setState({ hiperglicemia })
                    }
                  />
                </Item>
              </Form>
            <View
              style={styles.alignButons}
            >
              <BotaoPadrao
                onPress={() =>
                  this.state.niveis
                    ? this._verificarDados
                    : this.props.navigation.navigate("ConfigInicial1")
                }
                title="Voltar"
                wid={30}
                font={font.btnTextoPequeno}
              ></BotaoPadrao>
              <BotaoPadrao
                onPress={() =>
                  this.state.niveis
                    ? this._verificarDados
                    : this.props.navigation.navigate("Home")
                }
                title="Finalizar Cadastro"
                wid={45}
                font={font.btnTextoPequeno}
              ></BotaoPadrao>
            </View>
          </ScrollView>
            </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    zIndex:-999,
    flex:1,
    textAlign:'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: { 
    width:width*0.9, 
    alignItems: "center", 
    justifyContent: "center",
  },
  forms:{
    justifyContent: "space-around",
    height:height*0.70
  },
  formItem:{
    borderBottomColor:"black", 
    borderBottomWidth:2
  },
  alignButons: {
    padding:10,
    flexDirection: "row",
    justifyContent:"space-around"
  }
});
