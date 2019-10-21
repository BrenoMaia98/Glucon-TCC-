import React from "react";
import { 
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  Form,
  Item,
  Input,
} from "native-base";
import BotaoPadrao from '../../components/BotaoPadrao';
import {font} from '../../assets/estilos/styles';

var {height, width} = Dimensions.get('window');
export default class Cadastrar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email   : ' ',
      senha: ' ',
    }
  }
  render() {
    return (
        <ImageBackground source={require('../../assets/img/background/bgLuzes2.jpg')} style={styles.container}>
          <View style={{ width:width*0.9, alignItems: "center", justifyContent: "center",flex:1}}>
            <Text style={font.titulo}>Criando nova conta</Text>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              Nivel limite para os estados
            </Text>
            <View style={{alignItems:'center' , flex:1 , justifyContent:'space-between' , paddingBottom:50}}>
              <View style={styles.alignButton}>
                <BotaoPadrao onPress={() => this.props.navigation.navigate("Login")}
                  title="Já possui conta?" wid={60}  font={[styles.text,{fontSize:25}]}></BotaoPadrao>
              </View>
              <Text style={{fontSize:20}}>Insira o e-mail e senha</Text>
              <Form style={{marginBottom:height*0.05, width:width*0.9 , color:'black'}}>
                <Item><Text style={[font.amita,{fontSize:20}]}>E-mail :</Text>
                  <Input 
                  onChangeText={(email) => this.setState({email})}/>
                </Item>
                <Text style={{fontSize:18, textAlign:'center'}}>Insira sua senha e a repita no campo confirmar: </Text>
                <Item><Text style={[font.amita,{fontSize:20}]}>Senha :</Text>
                  <Input  secureTextEntry={true}
                   onChangeText={(senha) => this.setState({senha})}/>
                </Item>
                <Item><Text style={[font.amita,{fontSize:20}]}>Confirmar :</Text>
                  <Input  secureTextEntry={true}
                   onChangeText={(senha) => this.setState({senha})}/>
                </Item>
              </Form>
              <BotaoPadrao onPress={() => this.props.navigation.navigate("ConfigInicial1")}
                title="Continuar Cadastro" wid={70}></BotaoPadrao>
            </View>
          </View>
        </ImageBackground>
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
  text:{
    color: '#707070',
    textAlign:'center',
  },
  alignButton:{
    alignItems:'flex-end',
    width:width,
    paddingRight:width*0.1,
    paddingTop:width*0.05
  },

});