import React from "react";
import { 
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
var {width} = Dimensions.get('window');

const IndicadorInsulina = ({
    opacity,
    color
}) => {
    return(
             	<View style={{
                    width:width/6,
                    height:width/6,
                    borderWidth:2,
                    borderColor:"black",
                    borderRadius:360,
                    backgroundColor:color,
                    opacity:opacity,
                }}></View>
    )
}


export default IndicadorInsulina;