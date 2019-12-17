import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { font } from '../../../assets/estilos/styles';

//
//
//AINDA
//NÃO
//FUNCIONA
//,
//DEPOIS
//TENTO
//ARRUMAR
//
//
export const ModalMedicamentos = (props) => {
    return (
        < Modal
    animationType = "slide"
    transparent = { true}
    visible = { props.visible }
        >
        <TouchableOpacity style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}
            onPress={props.toggleVisible}
        >
            <View style={styles.modalSelect}>
                <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                    name="close" size={30} color="#900"
                    onPress={props.toggleVisible} />
                <Text style={{ fontFamily: "Jam", fontSize: 20, textAlign: "center", padding: 10 }}>
                    Selecione o Medicamento para adicionar
                                </Text>
                <FlatList
                    data={props.data}
                    extraData={props.extraData}
                    renderItem={({ item: rowData, index: id }) => {
                        return (
                            <TouchableOpacity onPress={() => { this._addMedicamento(rowData); }}
                                style={{ marginTop: 20, flex: 1, flexDirection: "row", width: width, justifyContent: "space-around", backgroundColor: id % 2 === 0 ? "#ccc" : "#fff" }}>
                                <>
                                    <View style={{ width: width * 0.6, textAlign: "center", justifyContent: "center" }}>
                                        <Text style={font.textoPickerRow}>{rowData.nome}</Text>
                                    </View>
                                    <View style={{ width: width * 0.4, textAlign: "center", justifyContent: "center" }}>
                                        <Text style={font.textoPickerRow}><Text style={{ color: "gray" }}>Vezes/dia:</Text> {rowData.vezes}</Text>
                                        <Text style={font.textoPickerRow}><Text style={{ color: "gray" }}>mg/ml:</Text> {rowData.mg}</Text>
                                    </View>
                                </>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </TouchableOpacity>
    </Modal >
);

}


const styles = StyleSheet.create({
    container: {
        zIndex: -999,
        flex: 1,
        paddingTop: height * 0.05,
        paddingBottom: height * 0.01,
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        color: '#707070',
        textAlign: 'center',
    },
    row: {
        flexDirection: "row",
        borderBottomColor: "black",
        borderBottomWidth: 2,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "rgba(255,255,255,0.3)"
    },
    modalSelect: {
        width: width,
        height: height * 0.7,
        backgroundColor: "#fff",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
    },
});
