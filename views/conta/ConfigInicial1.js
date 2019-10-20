import React from "react";
import { 
  View,
  Text,
  Button,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  Form,
  Item,
  Input,
  Picker,
  Icon,
  Radio,
  Alert,
} from "native-base";

import BotaoPadrao from '../../components/BotaoPadrao';
import {font} from '../../assets/estilos/styles';

var {height, width} = Dimensions.get('window');
export default class ConfigInicial1 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: ' ',
      senha: ' ',
      tipo : ' ',
      niveis:undefined,
    }
  }
  _verificarDados(){
  	if(this.state.email != ' ' && this.state.email != '' &&
  	   this.state.senha != ' ' && this.state.senha != ' ' &&
  	   this.state.tipo != ''){
  		if(this.state.niveis == false){
  			Alert.alert("Sucesso","Seu cadastro foi concluido com sucesso");
  			this.props.navigation.navigate("Login");
  		}else{
  			this.props.navigation.navigate("ConfigInicial2");
  		}
  	}
  }
  _onValueChange(value) {
    this.setState({
      tipo: value,
      niveis:false
    });
  }
  render() {
    return (
        <ImageBackground source={require('../../assets/img/background/bgLuzes.jpg')} style={styles.container}>
          <View style={{ width:width*0.9, alignItems: "center", justifyContent: "center",flex:1}}>
	        <ScrollView>
            <View style={styles.contentArea}>
	            <Text style={font.titulo}>Configurações Iniciais</Text>
	            <Text style={{fontSize: 18, textAlign: 'center'}}>
	             Para melhor experiência na utilização deste aplicativo, é necessário fornecer informações antes de utilizar suas funcionalidades.
	            </Text>
		              <Form style={{marginBottom:height*0.05, width:width*0.9 , color:'black'}}>
			              <Text style={font.s20}>Insira o seu tipo de diabetes</Text>
			              <View style={styles.picker}>
  				            <Picker
  				            style={{backgroundColor:"white", borderWidth:2,borderColor:"gray",}}
  				              mode="dropdown"
  				              iosIcon={<Icon name="arrow-down" />}
  				              placeholder="Não selecionado"
  				              placeholderStyle={{ color: "#bfc6ea" }}
  				              placeholderIconColor="#007aff"
  				              selectedValue={this.state.tipo}
  				              onValueChange={this._onValueChange.bind(this)}
  				            >
  				              <Picker.Item label="Diabetes Tipo 1" value="Tipo 1" />
  				              <Picker.Item label="Diabetes Tipo 2" value="Tipo 2" />
  				            </Picker>
			              </View>
			              <Text style={font.s20}>Utiliza medicamentos para diabetes?</Text>
                      <Text style={{padding: 40}}>RADIO BUTTON SIM E NAO AQUI</Text>
                    

			              <Text style={font.s20}>Conhece seus níveis de glicemia</Text>
			              <Text style={font.s20}>tanto para hipoglicemia,</Text>
			              <Text style={font.s20}>hiperglicemia e intervalo ideal?</Text>
                      <Text style={{padding: 40}}>RADIO BUTTON SIM E NAO AQUI</Text>
                    <View>
                      
                    </View>
		              </Form>

		              <BotaoPadrao onPress={() => this.state.niveis?this._verificarDados:this.props.navigation.navigate("ConfigInicial2")}
		                title="Continuar Cadastro" wid={70} >
		              </BotaoPadrao>
            </View>
	    	</ScrollView>
          </View>
        </ImageBackground>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    zIndex:-999,
    flex:1,
    textAlign:'center',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.7,
  },
  contentArea:{
    alignItems:'center',
    justifyContent: 'space-between',
    paddingTop:15
  },
  picker:{
    width:width*0.5,
    alignSelf:'center',
    borderWidth:2,
    backgroundColor:'#7070',
    borderColor:'#7070'
  },
  alignButton:{
    alignItems:'flex-end',
    width:width,
    paddingRight:width*0.1,
    paddingTop:width*0.05
  },

});