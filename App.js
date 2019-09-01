import TermoDeUso from './views/TermoDeUso';
import Cadastrar from './views/conta/Cadastrar';
import Login from './views/principal/Login';
import Home from './views/principal/Login';
import MenuOpcoes from './views/operacoes/MenuOpcoes';
import RegistroNivel from './views/operacoes/RegistroNivel';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import React from "react";
import { 
  View,
  Text 
} from "react-native";
import { 
  createStackNavigator, 
  createAppContainer, 
  createBottomTabNavigator,
  createDrawerNavigator 
} from 'react-navigation';


const AppNavigator = createStackNavigator(
 {
    Home:  Home,
    TermoDeUso:  TermoDeUso,
    Cadastrar:  Cadastrar,
    Login:  Login,
    MenuOpcoes:  MenuOpcoes,
    RegistroNivel:  RegistroNivel,
  },
  {
    initialRouteName: "TermoDeUso",
    defaultNavigationOptions:{
      header:null
    }
  }

);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {loading: true}
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Amita-Regular': require('./assets/fonts/Amita-Regular.ttf'),
      'Amita-Bold': require('./assets/fonts/Amita-Bold.ttf'),
    });

    this.setState({ loading: false });
  }

   render(){
    if(this.state.loading){
      return <AppLoading />;
    }
  return (
    <AppContainer />
  );
  }
}
