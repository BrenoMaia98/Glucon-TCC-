import React from "react";
import IndicadorInsulina from './subComponente/IndicadorInsulina';
import { 
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
var {width} = Dimensions.get('window');

const LuzesNivel = ({
    width,
    nivel
}) => {
    return(
        <View style={styles.row}>
            <IndicadorInsulina color="skyblue"  opacity={0.2} ></IndicadorInsulina>
            <IndicadorInsulina color="orange"   opacity={0.2} ></IndicadorInsulina>
            <IndicadorInsulina color="lime"    opacity={0.2} ></IndicadorInsulina>
            <IndicadorInsulina color="orange"   opacity={0.2} ></IndicadorInsulina>
            <IndicadorInsulina color="red"      opacity={0.2} ></IndicadorInsulina>
        </View>
        
    )
}
LuzesNivel.defaultProps = {
    nivel: undefined,
    label: "Button Text"
  };

const styles = StyleSheet.create({
    row:{
        width:width,
        flexDirection:"row", 
        paddingBottom:20, 
        paddingTop:20,
    },
    forma:{
        width:width/6,
        height:width/6,
        borderWidth:2,
        borderColor:"black",
        borderRadius:360,
    },
    txt:{
    	textAlign:'center' ,
    	fontSize: 28 ,
    	color:'#777',
    }

});

export default LuzesNivel;