import { Input, Item, Label } from 'native-base';
import React from "react";
import { Dimensions, FlatList, ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { font } from '../../../assets/estilos/styles';
import BotaoPadrao from '../../../components/BotaoPadrao';

import InputSpinner from "react-native-input-spinner";
import { reqDadosPerfil } from "../../../assets/Database/dadosPerfil";
import { RefeicoesBase } from "../../../assets/Database/refeicao";

import { StackActions, NavigationActions } from 'react-navigation';




var { height, width } = Dimensions.get('window');
export default class Refeicao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nivelSelecionado: null,
            data: reqDadosPerfil,

            RefeicoesBase: RefeicoesBase,
            RefeicoesBaseSelecionada: { apelido: "Nenhuma selecionada", alimentos: [] },
            modalSelectRefeicaoBase: false,
            filterRefeicaoBases: [],

            alimentosAdd: [""],

            novo: false,
            idSelecionada: -1,
            modalInfoRefeicaoBase: false,
            modalEditar: false
        }
    }



    render() {
        return (
            <ImageBackground source={require('../../../assets/img/background/refeicaobg2.jpg')} style={styles.container}>
                <View style={{
                    width: width, height: height, backgroundColor: "rgba(255,255,255,0.5)",
                    paddingTop: height * 0.05,
                    paddingBottom: height * 0.01,
                }}>
                    <ScrollView>
                        <View style={[styles.modalSelect]}>
                            <Text style={[font.jam, { fontSize: 45, alignSelf: "center", marginBottom: height * 0.05 }]}>Novo Registro</Text>
                            <View style={styles.ModalBuscaContainer}>
                                <TextInput
                                    style={{ borderColor: 'gray', borderWidth: 1, padding: 5, flex: 2 }}
                                    onChangeText={inputRefeicaoBaseBusca => this.setState({ inputRefeicaoBaseBusca })}
                                    value={this.state.inputRefeicaoBaseBusca}
                                />
                                <TouchableOpacity style={{ flex: 1, marginLeft: 20, borderWidth: 2, borderBottomColor: "black", borderRadius: 20, display: "flex", alignContent: 'center', justifyContent: "center", textAlign: "center" }}
                                    onPress={() => { console.log(this.state.inputRefeicaoBaseBusca); this._buscarRefeicaoBasePorNome(this.state.inputRefeicaoBaseBusca); }}>
                                    <Text style={font.textoPickerRow}>Buscar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: height * 0.6 }}>
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.filterRefeicaoBases.length === 0 ? this.state.RefeicoesBase : this.state.filterRefeicaoBases}
                                    renderItem={({ item: rowData, index: id }) => {
                                        return (
                                            <TouchableOpacity onPress={() => { this.setState({ idSelecionada: id, RefeicoesBaseSelecionada: rowData, modalInfoRefeicaoBase: true }) }}
                                                style={{ marginTop: 20, flex: 1, width: width, backgroundColor: id % 2 === 0 ? "#ccc" : "#fff" }}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <View style={{ width: width * 0.3, textAlign: "center", flex: 1, justifyContent: "center", paddingLeft: 10 }}>
                                                        <Text style={[font.textoPickerRow, { color: "gray", textAlign: "left" }]}>Apelido:   </Text>
                                                        <Text style={font.textoPickerRow}>{rowData.apelido}</Text>
                                                    </View>
                                                    <View style={{ width: width * 0.6, textAlign: "center", justifyContent: "center", paddingRight: 10 }}>
                                                        <Text style={[font.textoPickerRow, { color: "gray", textAlign: "left" }]}>Alimentos:   </Text>
                                                        {rowData.alimentos[0] &&
                                                            <Text style={[font.textoPickerRow, { textAlign: "left" }]}> -  {rowData.alimentos[0]}</Text>
                                                        }
                                                        {rowData.alimentos[1] &&
                                                            <Text style={[font.textoPickerRow, { textAlign: "left" }]}> -  {rowData.alimentos[1]}</Text>
                                                        }
                                                        {rowData.alimentos[2] &&
                                                            <Text style={[font.textoPickerRow, { textAlign: "left" }]}> -  {rowData.alimentos[2]}</Text>
                                                        }
                                                        {rowData.alimentos[3] &&
                                                            <Text style={[font.textoPickerRow, { textAlign: "left" }]}> -  {rowData.alimentos[3]}</Text>
                                                        }
                                                        {rowData.alimentos[4] &&
                                                            <Text style={font.textoPickerRow}>...</Text>
                                                        }
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <Icon style={{ alignSelf: "center", margin:20 }}
                                    name="plus-circle" size={50} color="#0e6820"
                                    onPress={() => {
                                        RefeicoesBaseSelecionada = { apelido: "", alimentos: [] };
                                        RefeicoesBaseSelecionada.alimentos.push("");
                                        this.setState({ RefeicoesBaseSelecionada, modalEditar: true })
                                    }} />
                                    <View style={{width:width , justifyContent:"center" , alignItems:"center"}}>

                                    <BotaoPadrao onPress={() => {
                                        this.setState({ modalSalvarRegistro: !this.state.modalSalvarRegistro });
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({ routeName: 'MenuOpcoes' })],
                                        });
                                        this.props.navigation.dispatch(resetAction);
                                    }}
                                    font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                    title="Voltar" wid={50}></BotaoPadrao>
                                    </View>
                            </View>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalInfoRefeicaoBase}
                        >
                            <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}                                                    >
                                <View style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingBottom: 10, height: height * 0.8, backgroundColor: "#fff", borderRadius: 20, borderColor: "#000", borderWidth: 2
                                }}>
                                    <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                        name="close" size={30} color="#900"
                                        onPress={() => {
                                            this.setState({ modalInfoRefeicaoBase: !this.state.modalInfoRefeicaoBase })
                                        }} />
                                    <Text style={{ fontFamily: "Jam", fontSize: 20, textAlign: "center", padding: 10 }}>
                                        Refeição base selecionada e sua lista de alimentos.
                                </Text>
                                    <View style={{ marginTop: 20, marginBottom: 20, flex: 1, width: width - 4, backgroundColor: "#ccc", flexDirection: "row", padding: 10 }}>
                                        <View style={{ textAlign: "center", flex: 1, justifyContent: "center", paddingLeft: 10 }}>
                                            <Text style={[font.textoPickerRow, { color: "gray", textAlign: "left" }]}>Apelido:   </Text>
                                            <Text style={font.textoPickerRow}>{this.state.RefeicoesBaseSelecionada.apelido}</Text>
                                        </View>
                                        <View style={{ flex: 2, textAlign: "center", justifyContent: "center", paddingRight: 10 }}>
                                            <Text style={[font.textoPickerRow, { color: "gray", textAlign: "left" }]}>Lista de alimentos registrados:   </Text>
                                            <FlatList
                                                extraData={this.state}
                                                data={this.state.RefeicoesBaseSelecionada.alimentos}
                                                renderItem={({ item: rowData }) => {
                                                    return (
                                                        <Text style={[font.textoPickerRow, { textAlign: "left" }]}> -  {rowData}</Text>
                                                    );
                                                }}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View>
                                    </View>
                                    <BotaoPadrao onPress={() => this.setState({ modalEditar: true, modalInfoRefeicaoBase: false })}
                                        font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                        title="Editar" wid={40}></BotaoPadrao>
                                </View>
                            </View>
                        </Modal>



                        {/* Modal Editar VVVVVVV */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalEditar}
                        >
                            <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}

                            >
                                <ScrollView>

                                    <View style={styles.modalEditar}>
                                        <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                            name="close" size={30} color="#900"
                                            onPress={() => {
                                                                                                this.setState({ modalEditar: !this.state.modalEditar })
                                            }} />
                                        <Text style={{ fontFamily: "Jam", fontSize: 30, paddingTop: 10, paddingBottom: 10 }}> Edição Refeição</Text>
                                        <View style={{ width: width * 0.8 }}>
                                            <Item floatingLabel>
                                                <Label>Apelido da refeição</Label>
                                                <Input
                                                    value={this.state.inputApelido}
                                                    onChangeText={(inputApelido) => this.setState({ inputApelido })}
                                                />
                                            </Item>
                                        </View>
                                        <Text style={{ fontFamily: "Jam", fontSize: 20, paddingTop: 10, paddingBottom: 10 }}> Lista de Alimentos da refeição</Text>
                                        <FlatList
                                            extraData={this.state}
                                            data={this.state.RefeicoesBaseSelecionada.alimentos}
                                            renderItem={({ item: rowData, index: index }) => {
                                                return (
                                                    <View style={styles.row} >
                                                        <View style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5, width: width * 0.9, textAlign: "center", justifyContent: "center", backgroundColor: index % 2 === 0 ? "#ccc" : "#fff" }}>
                                                            <View style={{ flex: 1 }}>
                                                                <Item floatingLabel>
                                                                    <Label> Alimento {index}</Label>
                                                                    <Input
                                                                        value={this.state.RefeicoesBaseSelecionada.alimentos[index]}
                                                                        onChangeText={(text) => {
                                                                            RefeicoesBaseSelecionada = this.state.RefeicoesBaseSelecionada;
                                                                            RefeicoesBaseSelecionada.alimentos[index] = text;
                                                                            this.setState({ RefeicoesBaseSelecionada })
                                                                        }
                                                                        }
                                                                    />
                                                                </Item>
                                                            </View>
                                                            <Icon style={{ alignSelf: "center", paddingRight: 10 }}
                                                                name="trash" size={35} color="#900"
                                                                onPress={() => {
                                                                    RefeicoesBaseSelecionada = this.state.RefeicoesBaseSelecionada;
                                                                    RefeicoesBaseSelecionada.alimentos.splice(index, 1);
                                                                    this.setState({ RefeicoesBaseSelecionada })
                                                                }} />
                                                        </View>
                                                    </View>
                                                );
                                            }}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                        <Text> Adicionar mais Alimentos</Text>
                                        <Icon style={{ alignSelf: "center", paddingLeft: 20, paddingBottom: 20 }}
                                            name="plus-circle" size={50} color="#0e6820"
                                            onPress={() => {
                                                RefeicoesBaseSelecionada = this.state.RefeicoesBaseSelecionada;
                                                RefeicoesBaseSelecionada.alimentos.push("");
                                                this.setState({ RefeicoesBaseSelecionada })
                                            }} />

                                        <BotaoPadrao onPress={() => {
                                            RefeicoesBase.splice(this.state.idSelecionada, 1);
                                            RefeicoesBase.unshift(this.state.RefeicoesBase)
                                        }
                                        }
                                            font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                            title="Finalizar edição" wid={80}></BotaoPadrao>
                                    </View>
                                </ScrollView>

                            </View>
                        </Modal>

                        {/* Modal Editar ^^^^^^ */}



                    </ScrollView>
                </View>
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex: -999,
        flex: 1,
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.1)"
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
    borderBottom: {
        borderBottomWidth: 2,
        borderBottomColor: "black",
    },
    tabela: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    alignButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: width,
        paddingTop: 50,
        paddingBottom: 20
    },
    modalSelect: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
    },
    modalInfo: {
        width: width * 0.9,
        backgroundColor: "#fff",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
    },
    ModalBuscaContainer: {
        flexDirection: "row",
        display: "flex",
        alignContent: 'center',
        justifyContent: "center",
        textAlign: "center",
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 20
    },
    modalEditar: {
        flex: 1, width: width,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
    },

});
