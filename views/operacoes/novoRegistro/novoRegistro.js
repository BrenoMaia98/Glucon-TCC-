import React from "react";
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    ScrollView,
    Dimensions,
    StyleSheet,
    Modal,
} from "react-native";
import {
    Form,
    Item,
    Input,
} from "native-base";
import BotaoPadrao from '../../../components/BotaoPadrao';
import LuzesNivel from '../../../components/LuzesNivel';
import { font } from '../../../assets/estilos/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native";

const reqDadosPerfil = {
    remedios: [
        { nome: "medicamento 1", vezes: 1, mg: 45 },
        { nome: "medicamento 2", vezes: 2, mg: 20 },
        { nome: "medicamento 3", vezes: 1, mg: 75 },
        { nome: "medicamento 4", vezes: 3, mg: 30 },
    ],
    reqAlimentos: [
        { nome: "Um alimento com um nome grande demais ", quantidade: 1, medida: "copo americano" },
        { nome: "alimento 1", quantidade: 2, medida: "copo americano" },
        { nome: "alimento numero 2", quantidade: 1, medida: "escumadeira" },
        { nome: "alimento 3", quantidade: 1, medida: "escumadeira" },
        { nome: "alimento quatro com algo a mais", quantidade: 10, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },
        { nome: "alimento 1", quantidade: 30, medida: "unidade" },

    ],
    hiperglicemia: 140,
    maxIdeal: 120,
    minIdeal: 80,
    hipoglicemia: 60,
}



var { height, width } = Dimensions.get('window');
export default class NovoRegistro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nivelSelecionado: null,
            data: reqDadosPerfil,

            refBase: "Nenhuma selecionada",

            alimentosSelecionados: [],
            remediosSelecionados: [],

            removerMedicamento: false,
            remClickMedicamento: -1,
            removerAlimento: false,


            modalVisible: false,
            modalInfo: false,
        }
    }
    _verificaNovoNivel = (nivel) => {
        console.log("60 , 80 , 120 , 140 : entrou '" + nivel + "'");
        if (nivel.length == 0 || nivel == null) {
            this.setState({ nivelSelecionado: null });
        }
        if (nivel <= this.state.data.hipoglicemia)
            this.setState({ nivelSelecionado: "hipo" });
        else {
            if (nivel <= this.state.data.minIdeal)
                this.setState({ nivelSelecionado: "minAlerta" });
            else {
                if (nivel <= this.state.data.maxIdeal)
                    this.setState({ nivelSelecionado: "normal" });
                else {
                    if (nivel <= this.state.data.hiperglicemia)
                        this.setState({ nivelSelecionado: "maxAlerta" });
                    else {
                        this.setState({ nivelSelecionado: "hiper" });
                    }
                }
            }
        }
    }

    _addAlimento = (rowData) => {
        let alimentosSelecionados = this.state.alimentosSelecionados;
        alimentosSelecionados.push({ nome: rowData.nome, quantidade: rowData.quantidade, medida: rowData.medida });
        this.setState({ alimentosSelecionados })
    }

    _addMedicamento = (rowData) => {
        console.log(rowData)
        let remediosSelecionados = this.state.remediosSelecionados;
        console.log(remediosSelecionados)
        remediosSelecionados.push({ nome: rowData.nome, vezes: rowData.vezes, mg: rowData.mg });
        this.setState({ remediosSelecionados })
    }

    _removerMedicamento = (index) => {
        console.log({index,clicadoAntes:this.state.remClickMedicamento});
        if (this.state.remClickMedicamento === index) {
            let remediosSelecionados = this.state.remediosSelecionados;
            console.log(remediosSelecionados);
            remediosSelecionados=  remediosSelecionados.splice(index, 1);
            this.setState({ remediosSelecionados,remClickMedicamento:-1 })
        }else{
            this.setState({remClickMedicamento:index})
        }
    }


    render() {
        return (
            <ImageBackground source={require('../../../assets/img/background/refeicaobg2.jpg')} style={styles.container}>
                <View style={{ width: width }}>
                    <ScrollView>
                        <Text style={[font.jam, { fontSize: 45, alignSelf: "center" }]}>Novo Registro</Text>
                        <View style={{ alignItems: "flex-start", justifyContent: "center", paddingLeft: 20 }}>


                            {/* Selecionar o nivel de glicemia do registo VVVV */}

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontFamily: 'Amita-Bold', fontSize: 25, textAlign: 'center', color: "#0e6820" }}>Nivel de glicemia: </Text>
                                <View style={{ borderBottomColor: "black", borderBottomWidth: 2 }} >
                                    <Input onChangeText={
                                        nivel => {
                                            this._verificaNovoNivel(nivel);
                                            this.setState({ nivel })
                                        }
                                    }
                                    />
                                </View>
                            </View>
                            <LuzesNivel nivel={this.state.nivelSelecionado}></LuzesNivel>

                            {/* Selecionar o nivel de glicemia do registo ^^^^^^^^ */}


                            {/* Lista de medicamentos já selecionados VVVVVVVV */}

                            <View style={{ flexDirection: "row" }}>
                                <Text style={[font.titulo, { color: "#0e6820" }]}>Medicamentos</Text>
                                {this.state.removerAlimento ?
                                    <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                        name="info-circle" size={35} color="#55f"
                                        onPress={() => this.setState({ modalInfo: !this.state.modalInfo })} />
                                    :
                                    <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                        name="plus-circle" size={35} color="#0e6820"
                                        onPress={() => this.setState({ modalVisible: !this.state.modalVisible })} />
                                }
                                <Icon style={{ alignSelf: "center", paddingLeft: 10 }}
                                    name="trash" size={35} color="#900"
                                    onPress={() => {
                                        this.setState({ removerAlimento: !this.state.removerAlimento, remClickMedicamento: -1 });
                                    }} />
                            </View>

                            <View style={styles.row}>
                                <View style={{ width: width * 0.45, textAlign: "center", justifyContent: "center" }}>
                                    <Text style={font.btnTextoPequeno}>Remédio</Text>
                                </View>
                                <View style={{ width: width * 0.30, textAlign: "center", justifyContent: "center" }}>
                                    <Text style={font.btnTextoPequeno}>vezes/dia</Text>
                                </View>
                                <View style={{ width: width * 0.18, textAlign: "center", justifyContent: "center" }}>
                                    <Text style={font.btnTextoPequeno}>mg</Text>
                                </View>
                            </View>
                            <FlatList
                                extraData={this.state}
                                data={this.state.remediosSelecionados}
                                renderItem={({ item: rowData, index }) => {
                                    return (
                                        <TouchableOpacity style={[styles.row,
                                        {
                                            backgroundColor:
                                                this.state.remClickMedicamento === index && this.state.removerMedicamento
                                                    ? "#ffa6a6" : "rgba(255,255,255,0.3)"
                                        }
                                        ]}
                                            onPress={() => { this._removerMedicamento(index) }} >
                                            <View style={{ width: width * 0.45, textAlign: "center", justifyContent: "center" }}>
                                                <Text style={font.btnTextoPequeno}>{rowData.nome}</Text>
                                            </View>
                                            <View style={{ width: width * 0.30, textAlign: "center", justifyContent: "center" }}>
                                                <Text style={font.btnTextoPequeno}>{rowData.vezes}</Text>
                                            </View>
                                            <View style={{ width: width * 0.18, textAlign: "center", justifyContent: "center" }}>
                                                <Text style={font.btnTextoPequeno}>{rowData.mg}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />

                            {/* Lista de medicamentos já selecionados ^^^^^^^^^^ */}


                            {/* Refeição Base Select VVVVVVVV */}

                            <View style={{ flexDirection: "row" }}>
                                <Text style={[font.titulo, { color: "#0e6820" }]}>Refeição base</Text>
                                <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                    name="edit" size={35} color="#0e6820"
                                    onPress={() => console.log("Funfou :D")} />
                            </View>

                            {/* Refeição Base Select ^^^^^^^^^^ */}

                            {/* Alimentos/bebidas selecionados VVVVVVVV */}

                            <Text style={{ fontFamily: "Jam", fontSize: 25, alignSelf: "center", textDecorationLine: "underline", paddingBottom: 20, paddingTop: 20 }}>{this.state.refBase}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontFamily: 'Amita-Bold', fontSize: 26, textAlign: 'center', color: "#0e6820" }}>Alimento/bebidas</Text>
                                {this.state.removerMedicamento ?
                                    <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                        name="info-circle" size={35} color="#55f"
                                        onPress={() => this.setState({ modalInfo: !this.state.modalInfo })} />
                                    :
                                    <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                        name="plus-circle" size={35} color="#0e6820"
                                        onPress={() => this.setState({ modalVisible: !this.state.modalVisible })} />
                                }
                                <Icon style={{ alignSelf: "center", paddingLeft: 10 }}
                                    name="trash" size={35} color="#900"
                                    onPress={() => { this.setState({ removerMedicamento: !this.state.removerMedicamento }); }} />
                            </View>
                            <View style={styles.row}>
                                <View style={{ width: width * 0.45, textAlign: "center", justifyContent: "center" }}>
                                    <Text style={font.btnTextoPequeno}>Alimento</Text>
                                </View>
                                <View style={{ width: width * 0.30, textAlign: "center", justifyContent: "center" }}>
                                    <Text style={font.btnTextoPequeno}>Qtd.</Text>
                                </View>
                                <View style={{ width: width * 0.18, textAlign: "center", justifyContent: "center" }}>
                                    <Text style={font.btnTextoPequeno}>Porção</Text>
                                </View>
                            </View>
                            <FlatList
                                extraData={this.state}
                                data={this.state.alimentosSelecionados}
                                renderItem={({ item: rowData }) => {
                                    return (
                                        <View style={styles.row}>
                                            <View style={{ width: width * 0.45, textAlign: "center", justifyContent: "center" }}>
                                                <Text style={font.btnTextoPequeno}>{rowData.nome}</Text>
                                            </View>
                                            <View style={{ width: width * 0.10, textAlign: "center", justifyContent: "center" }}>
                                                <Text style={font.btnTextoPequeno}>{rowData.quantidade}</Text>
                                            </View>
                                            <View style={{ width: width * 0.38, textAlign: "center", justifyContent: "center" }}>
                                                <Text style={font.btnTextoPequeno}>{rowData.medida}</Text>
                                            </View>
                                        </View>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>

                        {/* Alimentos/bebidas selecionados ^^^^^^ */}


                        {/* Buttons Voltar e Editar VVVVVVVVV */}

                        <View style={styles.alignButtons}>
                            <BotaoPadrao onPress={() => this.props.navigation.navigate("MenuOpcoes")}
                                font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                title="Voltar" wid={40}></BotaoPadrao>
                            <BotaoPadrao onPress={() => console.log("Em construção")}
                                font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                title="Editar" wid={40}></BotaoPadrao>
                        </View>
                        {/* Buttons Voltar e Editar ^^^^^^ */}
                    </ScrollView>

                    {/* Modal Medicamentos VVVVVVV */}
                    {/* Modal Medicamentos ^^^^^^ */}
                    {/* Modal Alimento VVVVVVV */}
                    {/* Modal Alimento ^^^^^^ */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <TouchableOpacity style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                this.setState({ modalVisible: !this.state.modalVisible })
                            }}
                        >
                            <View style={styles.modalSelect}>
                                <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                    name="close" size={30} color="#900"
                                    onPress={() => {
                                        this.setState({ modalVisible: !this.state.modalVisible })
                                    }} />
                                <Text style={{ fontFamily: "Jam", fontSize: 20, textAlign: "center", padding: 10 }}>
                                    Selecione o Medicamento para adicionar
                                </Text>
                                <FlatList
                                    data={this.state.data.remedios}
                                    extraData={this.state.data.remedios}
                                    renderItem={({ item: rowData, index: id }) => {
                                        return (
                                            <TouchableOpacity onPress={() => { console.log("oie"); this._addMedicamento(rowData); }}
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
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalInfo}
                    >
                        <TouchableOpacity style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                this.setState({ modalInfo: !this.state.modalInfo })
                            }}
                        >
                            <View style={styles.modalInfo}>
                                <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                    name="close" size={30} color="#900"
                                    onPress={() => {
                                        this.setState({ modalInfo: !this.state.modalInfo })
                                    }} />
                                <Text style={{ fontSize: 20, textAlign: "center", padding: 10 }}>
                                    O modo de exclusão foi ativado, para desativa-lo basta clicar novamente no icone ao lado
                                </Text>
                                <Text style={{ fontSize: 20, textAlign: "center", padding: 10 }}>
                                    Para excluir um registro basta clicar duas no mesmo.
                                </Text>
                                <Text style={{ fontSize: 20, textAlign: "center", padding: 10 }}>
                                    Assim o sistema não permite a exclusão por acidente.
                                </Text>

                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </ImageBackground >
        );
    }
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
    modalInfo: {
        width: width * 0.9,
        backgroundColor: "#fff",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
    }
});
