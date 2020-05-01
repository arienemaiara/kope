import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import TabBarIcon from '../../components/TabBarIcon';
import ConfiguracoesScreen from '../../screens/cliente/ConfiguracoesScreen';
import LerQRCodeScreen from '../../screens/estabelecimento/LerQRCodeScreen';
import CadastroScreen from '../../screens/cliente/CadastroScreen';
import EstabelecimentosScreen from '../../screens/cliente/EstabelecimentosScreen';
import RecompensasEstabelecimentoScreen from '../../screens/cliente/RecompensasEstabelecimentoScreen';
import EstabelecimentoDetalheScreen from '../../screens/cliente/EstabelecimentoDetalheScreen';
import PontosScreen from '../../screens/cliente/PontosScreen';
import ExtratoPontosScreen from '../../screens/cliente/ExtratoPontosScreen';
import Colors from '../../constants/Colors';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Estabelecimentos';

function Pontos() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="ListaPontos" component={PontosScreen} />
            <Stack.Screen name="ExtratoPontos" component={ExtratoPontosScreen} />
        </Stack.Navigator>
    )
}

function Configuracoes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
        </Stack.Navigator>
    )
}

function Estabelecimentos() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Estabelecimentos" component={EstabelecimentosScreen} />
            <Stack.Screen name="RecompensasEstabelecimento" component={RecompensasEstabelecimentoScreen} />
            <Stack.Screen name="EstabelecimentoDetalhe" component={EstabelecimentoDetalheScreen} />
        </Stack.Navigator>
    )
}

export default BottomTabNavigator = ({ navigation, route }) => {

    console.log('navigation', navigation, route)

    //navigation.setOptions({ headerTitle: getHeaderTitle(route), headerTintColor: 'red' });

    return (
        <BottomTab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{
                activeTintColor: Colors.tintColor,
                labelStyle: {
                    fontSize: 14,
                    fontFamily: 'circular-std'
                },
                style: {
                    height: 60
                }
            }}
        >
            <BottomTab.Screen
                name="Estabelecimentos"
                component={Estabelecimentos}
                options={{
                    title: "Estabelecimentos",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="shopping-cart" />,
                }}
            />
            <BottomTab.Screen
                name="Pontos"
                component={Pontos}
                options={{
                    title: "Pontos",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="star" />
                }}
            />
            <BottomTab.Screen
                name="QRCode"
                component={LerQRCodeScreen}
                options={{
                    title: "QR Code",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="plus-circle" />,
                }}
            />
            <BottomTab.Screen
                name="Configuracoes"
                component={Configuracoes}
                options={{
                    title: "Configurações",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="settings" />,
                }}
            />
        </BottomTab.Navigator>
    );

};


function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Recompensas':
            return 'Recompensas';
        case 'Resgates':
            return 'Resgates';
        case 'Configuracoes':
            return 'Configurações';
    }
}