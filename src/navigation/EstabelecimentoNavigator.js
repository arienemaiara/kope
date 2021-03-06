import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import RecompensasListaScreen from '../screens/estabelecimento/recompensas/RecompensasListaScreen';
import RecompensasCadastroScreen from '../screens/estabelecimento/recompensas/RecompensasCadastroScreen';
import ResgatesScreen from '../screens/estabelecimento/ResgatesScreen';
import ConfiguracoesScreen from '../screens/estabelecimento/ConfiguracoesScreen';
import CadastroScreen from '../screens/estabelecimento/CadastroScreen';

import LerQRCodeScreen from '../screens/estabelecimento/LerQRCodeScreen';
import AcumuloPontosScreen from '../screens/estabelecimento/movimentacao/AcumuloPontosScreen';
import SelecaoRecompensaScreen from '../screens/estabelecimento/movimentacao/SelecaoRecompensaScreen';
import ConfirmacaoScreen from '../screens/estabelecimento/movimentacao/ConfirmacaoScreen';
import Colors from '../constants/Colors';

import { isIphoneX } from '../utils/helpers';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Recompensas';

function Recompensas() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="RecompensasLista" component={RecompensasListaScreen} />
            <Stack.Screen name="RecompensasCadastro" component={RecompensasCadastroScreen} />
        </Stack.Navigator>
    )
}

function Movimentacoes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="QRCode" component={LerQRCodeScreen} />
            <Stack.Screen name="AcumuloPontos" component={AcumuloPontosScreen} />
            <Stack.Screen name="SelecaoRecompensa" component={SelecaoRecompensaScreen} />
            <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
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

export default BottomTabNavigator = ({ navigation, route }) => {


    return (
        <BottomTab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{
                activeTintColor: Colors.tintColor,
                labelStyle: {
                    fontSize: 14,
                    fontFamily: 'varela-round'
                },
                style: {
                    height: isIphoneX() ? 90 : 60
                }
            }}
        >
            <BottomTab.Screen
                name="Recompensas"
                component={Recompensas}
                options={{
                    title: "Recompensas",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="star" />
                }}
            />
            <BottomTab.Screen
                name="Resgates"
                component={ResgatesScreen}
                options={{
                    title: "Resgates",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="box" />,
                }}
            />
            <BottomTab.Screen
                name="Movimentacoes"
                component={Movimentacoes}
                options={{
                    title: "Ler QRCode",
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