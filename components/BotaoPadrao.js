import React from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
var {width} = Dimensions.get('window');

const BotaoPadrao = ({
    wid,
    onPress,
    title,
    font,
}) => {
    return(
        <TouchableOpacity
            onPress={onPress}
            style={wid ? {width:wid*width/100} : styles.btn}
        >
        	<View style={styles.forma}>
            	<Text style={font?font:styles.txt}>{title}</Text>
        	</View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        width:width*0.4,
    },
    forma:{
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 40,
        borderColor: '#777',
    },
    txt:{
    	textAlign:'center' ,
    	fontSize: 28 ,
    	color:'#777',
    }

});

export default BotaoPadrao;