import { Input, Item, Label } from 'native-base';
import { default as React } from "react";
import { Dimensions, FlatList, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { reqDadosPerfil } from "../../assets/Database/dadosPerfil.js";
import { font } from '../../assets/estilos/styles';
import BotaoPadrao from '../../components/BotaoPadrao';


var { height, width } = Dimensions.get('window');
export default class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ' ',
            senha: ' ',
            data: reqDadosPerfil,
            editar: false,

            remediosSelecionados: reqDadosPerfil.reqRemedios,
            modalSelectMedicamento: false,
            removerMedicamento: false,
            remClickMedicamento: -1,


            modalInfo: false,
        }
    };

    _addMedicamento = (rowData) => {
        let remediosSelecionados = this.state.remediosSelecionados;
        remediosSelecionados.push({ nome: rowData.nome, vezes: rowData.vezes, mg: rowData.mg });
        this.setState({ remediosSelecionados })
    }

    _removerMedicamento = (index) => {
        if (this.state.remClickMedicamento === index && this.state.removerMedicamento === true) {
            let remediosSelecionados = this.state.remediosSelecionados;
            let rem = remediosSelecionados[index];
            reqDadosPerfil.reqRemedios.splice(index,1);
            remediosSelecionados.splice(index, 1);
            this.setState({ remediosSelecionados, remClickMedicamento: -1 })
        } else {
            this.setState({ remClickMedicamento: index })
        }
    }


    render() {
        return (
            <ImageBackground source={require('../../assets/img/background/perfilbg.jpg')} style={styles.container}>
                <View style={{ width: width }}>
                    <ScrollView>
                        <Text style={[font.jam, { fontSize: 60, alignSelf: "center" }]}>Perfil</Text>
                        <View style={{ alignItems: "flex-start", justifyContent: "center", paddingLeft: 20 }}>
                            <Text style={[font.titulo, { color: "#0e6820" }]}>E-mail: </Text>
                            <Text style={{ fontFamily: "Jam", fontSize: 20, paddingLeft: 20, textDecorationLine: "underline" }}>{this.state.data.email}</Text>
                            {/* Lista de medicamentos já selecionados VVVVVVVV */}

                            <View style={{ flexDirection: "row" }}>
                                <Text style={[font.titulo, { color: "#0e6820" }]}>Medicamentos</Text>
                                {this.state.editar ?
                                    null
                                    :
                                    this.state.removerMedicamento ?
                                        <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                            name="info-circle" size={35} color="#55f"
                                            onPress={() => this.setState({ modalInfo: !this.state.modalInfo })} />
                                        :
                                        <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                            name="plus-circle" size={35} color="#0e6820"
                                            onPress={() => this.setState({ modalSelectMedicamento: !this.state.modalSelectMedicamento, inputMg: "", inputNome: "", inputVezesDia: "", })} />
                                }
                                {this.state.editar ? null :
                                    <Icon style={{ alignSelf: "center", paddingLeft: 10 }}
                                        name="trash" size={35} color="#900"
                                        onPress={() => {
                                            this.setState({

                                                removerMedicamento: !this.state.removerMedicamento, remClickMedicamento: -1
                                            });
                                        }} />
                                }
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
                                renderItem={({ item: rowData, index: index }) => {
                                    return (
                                        <TouchableOpacity style={[styles.row,
                                        {
                                            backgroundColor:
                                                (this.state.remClickMedicamento === index && this.state.removerMedicamento === true)
                                                    ? "#ffa6a6" : "rgba(255,255,255,1)"
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

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={[font.titulo, { color: "#0e6820" }]}>Tipo Diabetes: </Text>
                                <Text style={[font.btnTextoMedio, { color: "black", paddingLeft: 20, textDecorationLine: "underline" }]}>{this.state.data.tipoDiabetes}</Text>
                            </View>
                            <Text style={[font.titulo, { color: "#0e6820" }]}>Níveis de glicemia: </Text>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={[font.btnTextoMedio, { color: "#0e6820", paddingLeft: 20, }]}>Hiperglicemia</Text>
                                <Text style={[font.btnTextoMedio, { color: "black", paddingLeft: 20, textDecorationLine: "underline" }]}>{this.state.data.hiperglicemia}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={[font.btnTextoMedio, { color: "#0e6820", paddingLeft: 20, }]}>Máximo ideal</Text>
                                <Text style={[font.btnTextoMedio, { color: "black", paddingLeft: 20, textDecorationLine: "underline" }]}>{this.state.data.maxIdeal}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={[font.btnTextoMedio, { color: "#0e6820", paddingLeft: 20, }]}>Mínimo ideal</Text>
                                <Text style={[font.btnTextoMedio, { color: "black", paddingLeft: 20, textDecorationLine: "underline" }]}>{this.state.data.minIdeal}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={[font.btnTextoMedio, { color: "#0e6820", paddingLeft: 20, }]}>Hipoglicemia</Text>
                                <Text style={[font.btnTextoMedio, { color: "black", paddingLeft: 20, textDecorationLine: "underline" }]}>{this.state.data.hipoglicemia}</Text>
                            </View>

                        </View>
                        <View style={styles.alignButtons}>

                            <BotaoPadrao onPress={() => this.props.navigation.navigate("MenuOpcoes")}
                                font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                title="Voltar" wid={40}></BotaoPadrao>
                            <BotaoPadrao onPress={() => console.log("Em construção")}
                                font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                title="Editar" wid={40}></BotaoPadrao>
                        </View>
                    </ScrollView>
                    {/* Modal Medicamentos VVVVVVV */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalSelectMedicamento}
                    >
                        <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}

                        >
                            <View style={styles.modalSelect}>
                                <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                    name="close" size={30} color="#900"
                                    onPress={() => {
                                        this.setState({ modalSelectMedicamento: !this.state.modalSelectMedicamento })
                                    }} />
                                <View style={{ width: width * 0.8 }}>
                                    <Item floatingLabel>
                                        <Label>Nome Medicamento</Label>
                                        <Input
                                            value={this.state.inputNome}
                                            onChangeText={(inputNome) => this.setState({ inputNome })}
                                        />

                                    </Item>
                                </View>

                                <View style={{ marginTop: height * 0.05, width: width * 0.8 }}>
                                    <Item floatingLabel>
                                        <Label>Vezes por dia</Label>
                                        <Input
                                            value={this.state.inputVezesDia}
                                            onChangeText={(inputVezesDia) => this.setState({ inputVezesDia })}
                                        />

                                    </Item>
                                </View>

                                <View style={{ marginTop: height * 0.05, marginBottom: height * 0.05, width: width * 0.8 }}>
                                    <Item floatingLabel>
                                        <Label>Medida em mg</Label>
                                        <Input
                                            value={this.state.inputMg}
                                            onChangeText={(inputMg) => this.setState({ inputMg })}
                                        />

                                    </Item>
                                </View>
                                <BotaoPadrao onPress={() => {
                                    reqDadosPerfil.reqRemedios.push({
                                        nome: this.state.inputNome,
                                        mg: this.state.inputMg,
                                        vezes: this.state.inputVezesDia,
                                    });
                                    this.setState({ remediosSelecionados: reqDadosPerfil.reqRemedios });
                                }
                                }
                                    font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                    title="Confirmar" wid={40}></BotaoPadrao>
                            </View>
                        </View>
                    </Modal>

                    {/* Modal Medicamentos ^^^^^^ */}

                    {/* Modal Info para deletar VVVVVVV */}

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

                    {/* Modal deletar ^^^^^^ */}
                </View>
            </ImageBackground>
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
        paddingTop: 20,
        paddingBottom: 20
    },
    modalSelect: {
        width: width,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
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
});
