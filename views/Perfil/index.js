import React from "react";
import { 
  View,
  Text,
  FlatList,
  ImageBackground,
  ScrollView,
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

const data2 ={
    email:"emailteste@gmail.com",
    remedios:[
        {nome:"medicamento 1", vezes:1, mg:45},
        {nome:"medicamento 2", vezes:2, mg:20},
        {nome:"medicamento 3", vezes:1, mg:75},
        {nome:"medicamento 4", vezes:3, mg:30},
    ],
    tipo:"Tipo 1",
    hiperglicemia:140,
    maxIdeal:120,
    minIdeal:80,
    hipoglicemia:60,
}

var {height, width} = Dimensions.get('window');
export default class Perfil extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email   : ' ',
      senha: ' ',
      data:data2,
      editar:true,
    }
  }
  render() {
    return (
        <ImageBackground source={require('../../assets/img/background/perfilbg.jpg')} style={styles.container}>
            <View style={{width:width}}>
                <ScrollView>
                    <Text style={[font.jam,{fontSize:60, alignSelf:"center"}]}>Perfil</Text>
                    <View style={{alignItems: "flex-start", justifyContent: "center", paddingLeft:20}}>
                            <Text style={[font.titulo,{color:"#0e6820"}]}>E-mail: </Text>
                            <Text style={[{fontFamily:"Jam", fontSize:20,paddingLeft:20, textDecorationLine:"underline"}]}>{this.state.data.email}</Text>
                        <View style={{flexDirection:"row"}}>
                            <Text style={[font.titulo,{color:"#0e6820"}]}>Medicamentos</Text>
                            {this.state.editar?<Text style={{alignSelf:"center",paddingLeft:40}}>Add</Text>:null}
                        </View>
                        <View style={styles.row}>
                            <View style={{width:width*0.45,textAlign:"center",justifyContent:"center"}}>
                                <Text style={font.btnTextoPequeno}>Remédio</Text>
                            </View>
                            <View style={{width:width*0.30,textAlign:"center",justifyContent:"center"}}>
                                <Text style={font.btnTextoPequeno}>vezes/dia</Text>
                            </View>
                            <View style={{width:width*0.18,textAlign:"center",justifyContent:"center"}}>
                                <Text style={font.btnTextoPequeno}>mg</Text>
                            </View>
                        </View>
                        <FlatList
                            data={this.state.data.remedios}      
                            extraData={this.state.data.remedios}      
                            renderItem={({ item: rowData }) => {
                                return(
                                    <View style={styles.row}>
                                        <View style={{width:width*0.45,textAlign:"center",justifyContent:"center"}}>
                                            <Text style={font.btnTextoPequeno}>{rowData.nome}</Text>
                                        </View>
                                        <View style={{width:width*0.30,textAlign:"center",justifyContent:"center"}}>
                                            <Text style={font.btnTextoPequeno}>{rowData.vezes}</Text>
                                        </View>
                                        <View style={{width:width*0.18,textAlign:"center",justifyContent:"center"}}>
                                            <Text style={font.btnTextoPequeno}>{rowData.mg}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            />
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text style={[font.titulo,{color:"#0e6820"}]}>Tipo Diabetes: </Text>
                            <Text style={[font.btnTextoMedio,{color:"black", paddingLeft:20, textDecorationLine:"underline"}]}>{this.state.data.tipo}</Text>
                        </View>
                            <Text style={[font.titulo,{color:"#0e6820"}]}>Níveis de glicemia: </Text>
                            <View style={{flexDirection:"row",alignItems:"center",}}>
                            <Text style={[font.btnTextoMedio,{color:"#0e6820", paddingLeft:20,}]}>Hiperglicemia</Text>
                            <Text style={[font.btnTextoMedio,{color:"black", paddingLeft:20, textDecorationLine:"underline"}]}>{this.state.data.hiperglicemia}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center",}}>
                            <Text style={[font.btnTextoMedio,{color:"#0e6820", paddingLeft:20,}]}>Máximo ideal</Text>
                            <Text style={[font.btnTextoMedio,{color:"black", paddingLeft:20, textDecorationLine:"underline"}]}>{this.state.data.maxIdeal}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center",}}>
                            <Text style={[font.btnTextoMedio,{color:"#0e6820", paddingLeft:20,}]}>Mínimo ideal</Text>
                            <Text style={[font.btnTextoMedio,{color:"black", paddingLeft:20, textDecorationLine:"underline"}]}>{this.state.data.minIdeal}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center",}}>
                            <Text style={[font.btnTextoMedio,{color:"#0e6820", paddingLeft:20,}]}>Hipoglicemia</Text>
                            <Text style={[font.btnTextoMedio,{color:"black", paddingLeft:20, textDecorationLine:"underline"}]}>{this.state.data.hipoglicemia}</Text>
                        </View>
                        
                    </View>
                    <View style={styles.alignButtons}>

                        <BotaoPadrao onPress={() => this.props.navigation.navigate("MenuOpcoes")}
                            title="Voltar" wid={40}></BotaoPadrao>
                        <BotaoPadrao onPress={() => this.props.navigation.navigate("Perfil")}
                            title="Editar" wid={40}></BotaoPadrao>
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
    paddingTop:height*0.05,
    paddingBottom:height*0.01,
    textAlign:'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text:{
    color: '#707070',
    textAlign:'center',
  },
  row:{
    flexDirection:"row",
    borderBottomColor:"black",
    borderBottomWidth:2,
    paddingTop:10,
    paddingBottom:10,
  },
  borderBottom:{
      borderBottomWidth:2,
      borderBottomColor:"black",
  },
  tabela:{
      flexDirection:"row",
      justifyContent:"space-around",
  },
  alignButtons:{
      flexDirection:"row",
      justifyContent:"space-around", 
      width:width, 
      paddingTop:20,
      paddingBottom:20
    },
});