import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Form, Picker, Icon, Alert } from 'native-base';

import { ContaInfo } from './ContaInfo';
import BotaoPadrao from '../../../components/BotaoPadrao';
import { font } from '../../../assets/estilos/styles';

var { height, width } = Dimensions.get('window');
const box = StyleSheet.create({
    Checked: {
        borderRadius: 360,
        backgroundColor: 'white',
        width: width * 0.14,
        height: width * 0.14,
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: 'black',
    },
    Unchecked: {
        borderRadius: 360,
        backgroundColor: 'white',
        width: width * 0.14,
        height: width * 0.14,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    align: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

function Radio(props) {
    return (
        <TouchableOpacity
            style={props.checked ? box.Checked : box.Unchecked}
            onPress={props.func}
        >
            <Text style={{ textAlign: 'center' }}>{props.txt}</Text>
        </TouchableOpacity>
    );
}

export default class ConfigInicial1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ' ',
            senha: ' ',
            tipo: ' ',
            medicamentos: true,
            niveis: true,
        };
    }
    _verificarDados() {
        if (
            this.state.email != ' ' &&
            this.state.email != '' &&
            this.state.senha != ' ' &&
            this.state.senha != ' ' &&
            this.state.tipo != ''
        ) {
            if (this.state.niveis == false) {
                Alert.alert(
                    'Sucesso',
                    'Seu cadastro foi concluido com sucesso'
                );
                this.props.navigation.navigate('Login');
            } else {
                this.props.navigation.navigate('ConfigInicial2');
            }
        }
    }
    _onValueChange(value) {
        this.setState({
            tipo: value,
            niveis: false,
        });
    }
    _setMedicamento = value => {
        this.setState({ medicamentos: value });
    };
    _setNivel = value => {
        this.setState({ niveis: value });
    };

    render() {
        return (
            <ImageBackground
                source={require('../../../assets/img/background/bgLuzes2.jpg')}
                style={styles.container}
            >
                <View
                    style={{
                        width: width * 0.9,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >
                    <ScrollView>
                        <View style={styles.contentArea}>
                            <Text style={font.titulo}>
                                Configurações Iniciais
                            </Text>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>
                                Para melhor experiência na utilização deste
                                aplicativo, é necessário fornecer informações
                                antes de utilizar suas onPressionalidades.
                            </Text>
                            <Form
                                style={{
                                    marginBottom: height * 0.05,
                                    width: width * 0.9,
                                    color: 'black',
                                }}
                            >
                                <Text style={font.s20}>
                                    Insira o seu tipo de diabetes
                                </Text>
                                <View style={styles.picker}>
                                    <Picker
                                        style={{
                                            backgroundColor: 'white',
                                            borderWidth: 2,
                                            borderColor: 'gray',
                                        }}
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        placeholder="Não selecionado"
                                        placeholderStyle={{ color: '#bfc6ea' }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.tipo}
                                        onValueChange={this._onValueChange.bind(
                                            this
                                        )}
                                    >
                                        <Picker.Item
                                            label="Diabetes Tipo 1"
                                            value="Tipo 1"
                                        />
                                        <Picker.Item
                                            label="Diabetes Tipo 2"
                                            value="Tipo 2"
                                        />
                                    </Picker>
                                </View>
                                <Text style={font.s20}>
                                    Utiliza medicamentos para diabetes?
                                </Text>
                                {this.state.medicamentos ? (
                                    <View style={box.align}>
                                        <Radio
                                            checked={true}
                                            txt="Sim"
                                            func={() =>
                                                this._setMedicamento(true)
                                            }
                                        ></Radio>
                                        <Radio
                                            checked={false}
                                            txt="Não"
                                            func={() =>
                                                this._setMedicamento(false)
                                            }
                                        ></Radio>
                                    </View>
                                ) : (
                                    <View style={box.align}>
                                        <Radio
                                            checked={false}
                                            txt="Sim"
                                            func={() =>
                                                this._setMedicamento(true)
                                            }
                                        ></Radio>
                                        <Radio
                                            checked={true}
                                            txt="Não"
                                            func={() =>
                                                this._setMedicamento(false)
                                            }
                                        ></Radio>
                                    </View>
                                )}

                                <Text style={font.s20}>
                                    Conhece seus níveis de glicemia
                                </Text>
                                <Text style={font.s20}>
                                    tanto para hipoglicemia,
                                </Text>
                                <Text style={font.s20}>
                                    hiperglicemia e intervalo ideal?
                                </Text>
                                {this.state.niveis ? (
                                    <View style={box.align}>
                                        <Radio
                                            checked={true}
                                            txt="Sim"
                                            func={() => this._setNivel(true)}
                                        ></Radio>
                                        <Radio
                                            checked={false}
                                            txt="Não"
                                            func={() => this._setNivel(false)}
                                        ></Radio>
                                    </View>
                                ) : (
                                    <View style={box.align}>
                                        <Radio
                                            checked={false}
                                            txt="Sim"
                                            func={() => this._setNivel(true)}
                                        ></Radio>
                                        <Radio
                                            checked={true}
                                            txt="Não"
                                            func={() => this._setNivel(false)}
                                        ></Radio>
                                    </View>
                                )}
                                <View></View>
                            </Form>

                            <BotaoPadrao
                                onPress={() =>
                                    !this.state.niveis
                                        ? () => {
                                              console.log(ContaInfo);
                                              Alert.alert(
                                                  'Sucesso',
                                                  'Seu cadastro foi concluido com sucesso, caso deseje adicionar medicamentos ou editar informações, vá em Perfil'
                                              );
                                              this.props.navigation.navigate(
                                                  'Login'
                                              );
                                          }
                                        : this.props.navigation.navigate(
                                              'ConfigInicial2'
                                          )
                                }
                                title="Continuar Cadastro"
                                wid={70}
                            ></BotaoPadrao>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
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
    },
    contentArea: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
    },
    picker: {
        width: width * 0.5,
        alignSelf: 'center',
        borderWidth: 1,
        borderRightWidth: 6,
        backgroundColor: '#7070',
        borderColor: 'gray',
    },
    alignButton: {
        alignItems: 'flex-end',
        width: width,
        paddingRight: width * 0.1,
        paddingTop: width * 0.05,
    },
});
