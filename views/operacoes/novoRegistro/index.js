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
import BotaoPadrao from '../../../components/BotaoPadrao';
import LuzesNivel from '../../../components/LuzesNivel';
import {font} from '../../../assets/estilos/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const data2 ={
    remedios:[
        {nome:"medicamento 1", vezes:1, mg:45},
        {nome:"medicamento 2", vezes:2, mg:20},
        {nome:"medicamento 3", vezes:1, mg:75},
        {nome:"medicamento 4", vezes:3, mg:30},
    ],
    hiperglicemia:140,
    maxIdeal:120,
    minIdeal:80,
    hipoglicemia:60,
}

const alimentos =[
    {nome:"Um alimento com um nome grande demais ", quantidade:1 , medida:"copo americano"},
    {nome:"alimento 1"                      , quantidade:2 , medida:"copo americano"},
    {nome:"alimento numero 2"               , quantidade:1 , medida:"escumadeira"},
    {nome:"alimento 3"                      , quantidade:1 , medida:"escumadeira"},
    {nome:"alimento quatro com algo a mais" , quantidade:10 , medida:"unidade"},
    {nome:"alimento 1"                      , quantidade:30 , medida:"unidade"},
    
]

var {height, width} = Dimensions.get('window');
export default class NovoRegistro extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nivel:null,
      data:data2,
      alimento: alimentos,
      editar:true,
      refBase:"Nenhuma selecionada",
    }
  }
  render() {
    return (
        <ImageBackground source={require('../../../assets/img/background/refeicaobg2.jpg')} style={styles.container}>
            <View style={{width:width}}>
                <ScrollView>
                    <Text style={[font.jam,{fontSize:45, alignSelf:"center"}]}>Novo Registro</Text>
                    <View style={{alignItems: "flex-start", justifyContent: "center", paddingLeft:20}}>
                        <Form>
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                <Text style={{fontFamily: 'Amita-Bold', fontSize:25, textAlign: 'center',color:"#0e6820"}}>Nivel de glicemia: </Text>
                                <View style={{    borderBottomColor:"black",     borderBottomWidth:2}} >
                                    <Input
                                    onChangeText={nivel =>{
                                        this.setState({ nivel })
                                    }
                                    }
                                    />
                                </View>
                            </View>
                        </Form>

                        <LuzesNivel nivel={this.state.nivel}></LuzesNivel>            
                        <View style={{flexDirection:"row"}}>
                            <Text style={[font.titulo,{color:"#0e6820"}]}>Medicamentos</Text>
                            <Icon style={{alignSelf:"center",paddingLeft:20}} 
                                name="plus-circle" size={40} color="#0e6820" 
                                onPress={() => console.log("Funfou :D")}/>
                            <Icon style={{alignSelf:"center",paddingLeft:10}} 
                                name="trash" size={40} color="#900" 
                                onPress={() => {this.setState({removerMedicamento:!this.state.removerMedicamento},() => console.log(this.state.removerMedicamento));}}/>
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

                        <View style={{flexDirection:"row"}}>
                            <Text style={[font.titulo,{color:"#0e6820"}]}>Refeição base</Text>
                            <Icon style={{alignSelf:"center",paddingLeft:20}} 
                                name="edit" size={40} color="#0e6820" 
                                onPress={() => console.log("Funfou :D")}/>
                        </View>
                            <Text style={{fontFamily:"Jam", fontSize:25,alignSelf:"center", textDecorationLine:"underline", paddingBottom:20, paddingTop:20}}>{this.state.refBase}</Text>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontFamily: 'Amita-Bold', fontSize:26, textAlign: 'center',color:"#0e6820"}}>Alimento/bebidas</Text>
                            <Icon style={{alignSelf:"center",paddingLeft:20}} 
                                name="plus-circle" size={40} color="#0e6820" 
                                onPress={() => console.log("Funfou :D")}/>
                            <Icon style={{alignSelf:"center",paddingLeft:10}} 
                                name="trash" size={40} color="#900" 
                                onPress={() => {this.setState({removerMedicamento:!this.state.removerMedicamento},() => console.log(this.state.removerMedicamento));}}/>
                        </View>
                        <View style={styles.row}>
                            <View style={{width:width*0.45,textAlign:"center",justifyContent:"center"}}>
                                <Text style={font.btnTextoPequeno}>Alimento</Text>
                            </View>
                            <View style={{width:width*0.30,textAlign:"center",justifyContent:"center"}}>
                                <Text style={font.btnTextoPequeno}>Qtd.</Text>
                            </View>
                            <View style={{width:width*0.18,textAlign:"center",justifyContent:"center"}}>
                                <Text style={font.btnTextoPequeno}>Porção</Text>
                            </View>
                        </View>

                        <FlatList
                            data={this.state.alimento}      
                            extraData={this.state.alimento}      
                            renderItem={({ item: rowData }) => {
                                return(
                                    <View style={styles.row}>
                                        <View style={{width:width*0.45,textAlign:"center",justifyContent:"center"}}>
                                            <Text style={font.btnTextoPequeno}>{rowData.nome}</Text>
                                        </View>
                                        <View style={{width:width*0.10,textAlign:"center",justifyContent:"center"}}>
                                            <Text style={font.btnTextoPequeno}>{rowData.quantidade}</Text>
                                        </View>
                                        <View style={{width:width*0.38,textAlign:"center",justifyContent:"center"}}>
                                            <Text style={font.btnTextoPequeno}>{rowData.medida}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            />
                        
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