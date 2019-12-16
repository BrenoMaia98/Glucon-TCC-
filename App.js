import TermoDeUso from './views/TermoDeUso';
import TelaCarregamento from './views/TelaCarregamento';
import Cadastrar from './views/Conta/Cadastro/Cadastrar';
import ConfigInicial1 from './views/Conta/Cadastro/ConfigInicial1';
import ConfigInicial2 from './views/Conta/Cadastro/ConfigInicial2';
import EsqueciSenha from './views/Conta/EsqueciMinhaSenha/EsqueciSenha';
import Perfil from './views/Perfil/perfil';
import Login from './views/principal/Login';
import Home from './views/principal/Home';
import MenuOpcoes from './views/operacoes/MenuOpcoes';
import NovoRegistro from './views/operacoes/novoRegistro/novoRegistro';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        TermoDeUso: TermoDeUso,
        TelaCarregamento: TelaCarregamento,
        Cadastrar: Cadastrar,
        ConfigInicial1: ConfigInicial1,
        ConfigInicial2: ConfigInicial2,
        EsqueciSenha: EsqueciSenha,
        Perfil: Perfil,
        Login: Login,
        MenuOpcoes: MenuOpcoes,
        NovoRegistro: NovoRegistro,
    },
    {
        initialRouteName: 'Perfil',
        defaultNavigationOptions: {
            header: null,
        },
    }
);
//  initialRouteName: "TermoDeUso",
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Amita-Regular': require('./assets/fonts/Amita-Regular.ttf'),
            'Amita-Bold': require('./assets/fonts/Amita-Bold.ttf'),
            'Jam': require('./assets/fonts/JamSessions.ttf'),
        });

        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return <AppLoading />;
        }
        return <AppContainer />;
    }
}
