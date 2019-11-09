import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Button, Card, CardItem } from 'native-base';
import BotaoPadrao from '../components/BotaoPadrao';

var { height, width } = Dimensions.get('window');

export default class TelaCarregamento extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ImageBackground
                    source={require('../assets/img/background/bgLuzes.jpg')}
                    style={styles.container}
                >
                    <Text style={{ fontFamily: 'Amita-Bold', fontSize: 26 }}>
                        Termo de Responsabilidade
                    </Text>
                    <ActivityIndicator />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'space-around',
                            justifyContent: 'space-around',
                            width: width,
                        }}
                    >
                        <BotaoPadrao
                            title="Sim"
                            onPress={() =>
                                this.props.navigation.navigate('Cadastrar')
                            }
                        ></BotaoPadrao>
                        <BotaoPadrao
                            title="Não"
                            onPress={() => alert('queria fecha o app...')}
                        ></BotaoPadrao>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: height * 0.05,
        zIndex: -999,
        flex: 1,
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
});
