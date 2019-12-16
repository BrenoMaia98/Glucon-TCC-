import { Input } from "native-base";
import React from "react";
import { Dimensions, FlatList, ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { font } from '../../../assets/estilos/styles';
import BotaoPadrao from '../../../components/BotaoPadrao';
import LuzesNivel from '../../../components/LuzesNivel';

import InputSpinner from "react-native-input-spinner";
import { reqDadosPerfil } from "../../../assets/Database/dadosPerfil";
import { RefeicoesBase } from "../../../assets/Database/refeicao";





var { height, width } = Dimensions.get('window');
export default class NovoRegistro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nivelSelecionado: null,
            data: reqDadosPerfil,

            remediosSelecionados: [],
            modalSelectMedicamento: false,
            removerMedicamento: false,
            remClickMedicamento: -1,

            alimentosSelecionados: [],
            filterAlimentos: [],
            QTDfilterAlimentos: [],
            modalSelectAlimento: false,
            removerAlimento: false,
            remClickAlimento: -1,

            RefeicoesBase: RefeicoesBase,
            RefeicoesBaseSelecionada: { apelido: "Nenhuma selecionada", alimentos: [] },
            modalSelectRefeicaoBase: false,
            filterRefeicaoBases: [],

            modalInfoRefeicaoBase: false,

            modalInfo: false,
            modalSalvarRegistro: false,
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
        let QTDfilterAlimentos = this.state.QTDfilterAlimentos;
        QTDfilterAlimentos.push(1);
        alimentosSelecionados.push({ nome: rowData.nome, porcao: rowData.porcao, medidaUsual: rowData.medidaUsual });
        this.setState({ alimentosSelecionados, QTDfilterAlimentos })
    }

    _removerAlimento = (index) => {
        if (this.state.remClickAlimento === index && this.state.removerAlimento === true) {
            let alimentosSelecionados = this.state.alimentosSelecionados;
            let QTDfilterAlimentos = this.state.QTDfilterAlimentos;
            QTDfilterAlimentos.splice(index, 1);
            alimentosSelecionados.splice(index, 1);
            this.setState({ alimentosSelecionados, QTDfilterAlimentos, remClickAlimento: -1 })
        } else {
            this.setState({ remClickAlimento: index })
        }
    }

    _addMedicamento = (rowData) => {
        let remediosSelecionados = this.state.remediosSelecionados;
        remediosSelecionados.push({ nome: rowData.nome, vezes: rowData.vezes, mg: rowData.mg });
        this.setState({ remediosSelecionados })
    }

    _removerMedicamento = (index) => {
        if (this.state.remClickMedicamento === index && this.state.removerMedicamento === true) {
            let remediosSelecionados = this.state.remediosSelecionados;
            remediosSelecionados.splice(index, 1);
            this.setState({ remediosSelecionados, remClickMedicamento: -1 })
        } else {
            this.setState({ remClickMedicamento: index })
        }
    }


    _buscarAlimentoPorNome = (string) => {
        let filterAlimentos = this.state.data.reqAlimentos.filter(
            o => o.nome.toLowerCase().includes(string.toLowerCase()));

        this.setState({ filterAlimentos });
    }

    _buscarRefeicaoBasePorNome = (string) => {
        let filterRefeicaoBases = this.state.RefeicoesBase.filter(
            o => o.apelido.toLowerCase().includes(string.toLowerCase()));

        this.setState({ filterRefeicaoBases });
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
                                {this.state.removerMedicamento ?
                                    <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                        name="info-circle" size={35} color="#55f"
                                        onPress={() => this.setState({ modalInfo: !this.state.modalInfo })} />
                                    :
                                    <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                        name="plus-circle" size={35} color="#0e6820"
                                        onPress={() => this.setState({ modalSelectMedicamento: !this.state.modalSelectMedicamento })} />
                                }
                                <Icon style={{ alignSelf: "center", paddingLeft: 10 }}
                                    name="trash" size={35} color="#900"
                                    onPress={() => {
                                        this.setState({ removerMedicamento: !this.state.removerMedicamento, remClickMedicamento: -1 });
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


                            {/* Refeição Base Select VVVVVVVV */}

                            <View style={{ flexDirection: "row" }}>
                                <Text style={[font.titulo, { color: "#0e6820" }]}>Refeição base</Text>
                                <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                    name="edit" size={35} color="#0e6820"
                                    onPress={() => {
                                        console.log(this.state.RefeicoesBaseSelecionada)
                                        this.setState({ modalSelectRefeicaoBase: !this.setState.modalSelectRefeicaoBase })
                                    }} />
                            </View>
                            <Text style={{ fontFamily: "Jam", fontSize: 25, alignSelf: "center", textDecorationLine: "underline", paddingBottom: 20, paddingTop: 20 }}>
                                {this.state.RefeicoesBaseSelecionada ? this.state.RefeicoesBaseSelecionada.apelido : null}
                            </Text>

                            {/* Refeição Base Select ^^^^^^^^^^ */}

                            {/* Alimentos/bebidas selecionados VVVVVVVV */}

                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontFamily: 'Amita-Bold', fontSize: 26, textAlign: 'center', color: "#0e6820" }}>Alimento/bebidas</Text>
                                {this.state.removerAlimento ?
                                    <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                        name="info-circle" size={35} color="#55f"
                                        onPress={() => this.setState({ modalInfo: !this.state.modalInfo })} />
                                    :
                                    <Icon style={{ alignSelf: "center", paddingLeft: 20 }}
                                        name="plus-circle" size={35} color="#0e6820"
                                        onPress={() => this.setState({ modalSelectAlimento: !this.state.modalSelectAlimento })} />
                                }
                                <Icon style={{ alignSelf: "center", paddingLeft: 10 }}
                                    name="trash" size={35} color="#900"
                                    onPress={() => { this.setState({ removerAlimento: !this.state.removerAlimento }); }} />
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
                                renderItem={({ item: rowData, index: index }) => {
                                    return (
                                        <TouchableOpacity style={[styles.row,
                                        {
                                            backgroundColor:
                                                this.state.remClickAlimento === index && this.state.removerAlimento
                                                    ? "#ffa6a6" : "rgba(255,255,255,1)"
                                        }
                                        ]}
                                            onPress={() => { this._removerAlimento(index) }} >
                                            <View style={{ width: width * 0.45, textAlign: "center", justifyContent: "center" }}>
                                                <Text style={font.btnTextoPequeno}>{rowData.nome}</Text>
                                            </View>
                                            <View style={{ width: width * 0.30, textAlign: "center", justifyContent: "center" }}>
                                                <Text style={font.btnTextoPequeno}>{rowData.medidaUsual}</Text>
                                            </View>
                                            <View style={{ width: width * 0.18, textAlign: "center", justifyContent: "center" }}>
                                                <Text style={font.btnTextoPequeno}>{rowData.porcao}</Text>
                                            </View>
                                        </TouchableOpacity>
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
                            <BotaoPadrao onPress={() => this.setState({ modalSalvarRegistro: !this.state.modalSalvarRegistro })}
                                font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                title="Salvar" wid={40}></BotaoPadrao>
                        </View>
                        {/* Buttons Voltar e Editar ^^^^^^ */}
                    </ScrollView>

                    {/* Modal Medicamentos VVVVVVV */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalSelectMedicamento}
                    >
                        <TouchableOpacity style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                this.setState({ modalSelectMedicamento: !this.state.modalSelectMedicamento })
                            }}
                        >
                            <View style={styles.modalSelect}>
                                <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                    name="close" size={30} color="#900"
                                    onPress={() => {
                                        this.setState({ modalSelectMedicamento: !this.state.modalSelectMedicamento })
                                    }} />
                                <Text style={{ fontFamily: "Jam", fontSize: 20, textAlign: "center", padding: 10 }}>
                                    Selecione o Medicamento para adicionar
                                </Text>
                                <FlatList
                                    data={this.state.data.reqRemedios}
                                    extraData={this.state.data.reqRemedios}
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
                    </Modal>

                    {/* Modal Medicamentos ^^^^^^ */}

                    {/* Modal Alimento VVVVVVV */}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalSelectAlimento}
                    >
                        <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}                                                    >
                            <View style={[styles.modalSelect, { height: height * 0.9 }]}>
                                <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                    name="close" size={30} color="#900"
                                    onPress={() => {
                                        this.setState({ modalSelectAlimento: !this.state.modalSelectAlimento })
                                    }} />
                                <Text style={{ fontFamily: "Jam", fontSize: 20, textAlign: "center", padding: 10 }}>
                                    Busque o Alimento para adiciona-lo
                                    </Text>
                                <View style={styles.ModalBuscaContainer}>
                                    <TextInput
                                        style={{ borderColor: 'gray', borderWidth: 1, padding: 5, flex: 2 }}
                                        onChangeText={inputAlimentoBusca => this.setState({ inputAlimentoBusca })}
                                        value={this.state.inputAlimentoBusca}
                                    />
                                    <TouchableOpacity style={{ flex: 1, marginLeft: 20, borderWidth: 2, borderBottomColor: "black", borderRadius: 20, display: "flex", alignContent: 'center', justifyContent: "center", textAlign: "center" }}
                                        onPress={() => { console.log(this.state.inputAlimentoBusca); this._buscarAlimentoPorNome(this.state.inputAlimentoBusca); }}>
                                        <Text style={font.textoPickerRow}>Buscar</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.filterAlimentos.length === 0 ? this.state.data.reqAlimentos : this.state.filterAlimentos}
                                    renderItem={({ item: rowData, index: id }) => {
                                        return (
                                            <TouchableOpacity onPress={() => { this._addAlimento(rowData); }}
                                                style={{ marginTop: 20, flex: 1, flexDirection: "row", width: width, justifyContent: "space-around", backgroundColor: id % 2 === 0 ? "#ccc" : "#fff" }}>
                                                <>
                                                    <View style={{ width: width * 0.4, textAlign: "center", justifyContent: "center" }}>
                                                        <Text style={font.textoPickerRow}>{rowData.nome}</Text>
                                                    </View>
                                                    <View style={{ width: width * 0.4, textAlign: "center", justifyContent: "center" }}>
                                                        <Text style={font.textoPickerRow}><Text style={{ color: "gray" }}>Medida:</Text> {rowData.medidaUsual}</Text>
                                                    </View>
                                                    <View style={{ width: width * 0.2, textAlign: "center", justifyContent: "center" }}>
                                                        <Text style={font.textoPickerRow}><Text style={{ color: "gray" }}>g/ml:</Text> {rowData.porcao}</Text>
                                                        <Text style={font.textoPickerRow}><Text style={{ color: "gray" }}>Carbs:</Text> {rowData.carbs}</Text>
                                                    </View>
                                                </>
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                    </Modal>

                    {/* Modal Alimento ^^^^^^ */}

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

                    {/* Modal QtdAlimentosSelecionados VVVVVVV */}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalSalvarRegistro}
                    >
                        <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}                                                    >
                            <View style={[styles.modalSelect, { height: height * 0.9 }]}>
                                <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                    name="close" size={30} color="#900"
                                    onPress={() => {
                                        this.setState({ modalSalvarRegistro: !this.state.modalSalvarRegistro })
                                    }} />
                                <Text style={{ fontFamily: "Jam", fontSize: 20, textAlign: "center", padding: 10 }}>
                                    Selecione as quantidades estimadas de cada alimento do registro para salvar
                                    </Text>
                                <FlatList
                                    extraData={this.state.QTDfilterAlimentos}
                                    data={this.state.alimentosSelecionados}
                                    renderItem={({ item: rowData, index: id }) => {
                                        return (
                                            <View
                                                style={{ marginTop: 20, flex: 1, width: width, backgroundColor: id % 2 === 0 ? "#ccc" : "#fff" }}>
                                                <View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <View>
                                                            <View style={{ width: width * 0.5, textAlign: "center", flex: 1, justifyContent: "center", }}>
                                                                <Text style={font.textoPickerRow}>{rowData.nome}</Text>
                                                            </View>
                                                            <View style={{ width: width * 0.5, textAlign: "center", justifyContent: "center", }}>
                                                                <Text style={font.textoPickerRow}>{rowData.medidaUsual}<Text style={{ color: "gray" }}>  {rowData.porcao}g/ml</Text></Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ padding: 5, width: width * 0.5, textAlign: "center", flex: 1, flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
                                                            <InputSpinner
                                                                min={0}
                                                                step={1}
                                                                rounded={false}
                                                                showBorder
                                                                colorRight={"#8888ff"}
                                                                colorLeft={"#8888ff"}
                                                                color={"#000"}
                                                                value={this.state.QTDfilterAlimentos[id]}
                                                                onChange={(num) => {
                                                                    let QTDfilterAlimentos = this.state.QTDfilterAlimentos;
                                                                    QTDfilterAlimentos[id] = num;
                                                                    this.setState({ QTDfilterAlimentos })
                                                                }}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <BotaoPadrao onPress={() => this.setState({ modalSalvarRegistro: !this.state.modalSalvarRegistro })}
                                    font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                    title="Concluir Registro" wid={80}></BotaoPadrao>
                            </View>
                        </View>
                    </Modal>

                    {/* Modal QtdAlimentosSelecionados ^^^^^^ */}

                    {/* Modal RefeicaoBase VVVVVVV */}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalSelectRefeicaoBase}
                    >
                        <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}                                                    >
                            <View style={[styles.modalSelect, { height: height * 0.9 }]}>
                                <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                    name="close" size={30} color="#900"
                                    onPress={() => {
                                        this.setState({ modalSelectRefeicaoBase: !this.state.modalSelectRefeicaoBase })
                                    }} />
                                <Text style={{ fontFamily: "Jam", fontSize: 20, textAlign: "center", padding: 10 }}>
                                    Os alimentos da refeição selecionada, serão adicionados a sua lista de alimentos deste registro
                                    </Text>
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
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.filterRefeicaoBases.length === 0 ? this.state.RefeicoesBase : this.state.filterRefeicaoBases}
                                    renderItem={({ item: rowData, index: id }) => {
                                        return (
                                            <TouchableOpacity onPress={() => { this.setState({ RefeicoesBaseSelecionada: rowData, modalInfoRefeicaoBase: true }) }}
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
                            </View>
                        </View>
                    </Modal>

                    {/* Modal RefeicaoBase ^^^^^^ */}


                    {/* Modal RefeicaoBaseInfo VVVVVVV */}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalInfoRefeicaoBase}
                    >
                        <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center", backgroundColor: "#ccc" }}                                                    >
                            <View style={[styles.modalSelect, { height: height * 0.9 }]}>
                                <Icon style={{ zIndex: 1, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                                    name="close" size={30} color="#900"
                                    onPress={() => {
                                        this.setState({ modalInfoRefeicaoBase: !this.state.modalInfoRefeicaoBase })
                                    }} />
                                <Text style={{ fontFamily: "Jam", fontSize: 20, textAlign: "center", padding: 10 }}>
                                    Caso confirmada a refeição base, seus respectivos alimentos serão adicionados a sua lista de alimentos deste registro.
                                </Text>
                                <View style={{ marginTop: 20 , marginBottom:20, flex: 1, width: width-4, backgroundColor: "#ccc",flexDirection: "row" , padding:10  }}>
                                        <View style={{ textAlign: "center", flex: 1, justifyContent: "center", paddingLeft: 10 }}>
                                            <Text style={[font.textoPickerRow, { color: "gray", textAlign: "left" }]}>Apelido:   </Text>
                                            <Text style={font.textoPickerRow}>{this.state.RefeicoesBaseSelecionada.apelido}</Text>
                                        </View>
                                        <View style={{flex:2, textAlign: "center", justifyContent: "center", paddingRight: 10 }}>
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
                                <BotaoPadrao onPress={() => this.props.navigation.navigate("MenuOpcoes")}
                                    font={[font.btnTextoGrande, { fontFamily: "Jam", padding: 10 }]}
                                    title="Confirmar" wid={40}></BotaoPadrao>
                            </View>
                        </View>
                    </Modal>

                    {/* Modal RefeicaoBase ^^^^^^ */}


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

});
