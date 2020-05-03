import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import CadastroClienteScreen from '../screens/cliente/CadastroScreen';
import CadastroEstabelecimentoScreen from '../screens/estabelecimento/CadastroScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = props => {

    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
            />
            <AuthStack.Screen name="CadastroCliente" component={CadastroClienteScreen} />
            <AuthStack.Screen name="CadastroEstabelecimento" component={CadastroEstabelecimentoScreen} />
        </AuthStack.Navigator>
    )
};

export default AuthNavigator;