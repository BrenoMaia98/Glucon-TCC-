import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { Form, Item, Input } from 'native-base';

import BotaoPadrao from '../../components/BotaoPadrao';
import { font } from '../../assets/estilos/styles';
var { height, width } = Dimensions.get('window');

export default class Login extends React.Component {
    render() {
        return (
            <ImageBackground
                source={require('../../assets/img/background/bgLuzesInverso.jpg')}
                style={styles.bgImage}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}
                >
                    <Text style={[font.jam, { fontSize: 60 }]}>DM Control</Text>
                    <Text style={font.titulo}>
                        {' '}
                        Diabetes Mellitus Controler
                    </Text>
                    <Form style={styles.forms}>
                        <Item style={styles.formItem}>
                            <Text style={{ fontFamily: 'Jam', fontSize: 25 }}>
                                Login :
                            </Text>
                            <Input
                                onChangeText={login => this.setState({ login })}
                            />
                        </Item>
                        <Item style={styles.formItem}>
                            <Text style={{ fontFamily: 'Jam', fontSize: 25 }}>
                                Senha :
                            </Text>
                            <Input
                            type="password"
                                onChangeText={senha => this.setState({ senha })}
                            />
                        </Item>
                    </Form>
                    <Text
                        style={styles.esqueciSenha}
                        onPress={() => {
                            this.props.navigation.navigate('EsqueciSenha');
                        }}
                    >
                        esqueci minha senha.
                    </Text>
                    <BotaoPadrao
                        onPress={() =>
                            this.props.navigation.navigate('MenuOpcoes')
                        }
                        title="Acessar sua conta"
                        wid={55}
                        font={[
                            font.btnTextoMedio,
                            { fontFamily: 'Jam', padding: 10 },
                        ]}
                    ></BotaoPadrao>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    bgImage: {
        zIndex: -999,
        height: height,
    },
    esqueciSenha: {
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    forms: {
        justifyContent: 'space-around',
        width: width * 0.8,
    },
    formItem: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
});
