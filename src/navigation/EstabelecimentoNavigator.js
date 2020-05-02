import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import RecompensasListaScreen from '../screens/estabelecimento/recompensas/RecompensasListaScreen';
import RecompensasCadastroScreen from '../screens/estabelecimento/recompensas/RecompensasCadastroScreen';
import ResgatesScreen from '../screens/estabelecimento/ResgatesScreen';
import ConfiguracoesScreen from '../screens/estabelecimento/ConfiguracoesScreen';
import LerQRCodeScreen from '../screens/estabelecimento/LerQRCodeScreen';
import Colors from '../constants/Colors';

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

export default BottomTabNavigator = ({ navigation, route }) => {


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
                name="QRCode"
                component={LerQRCodeScreen}
                options={{
                    title: "Ler QRCode",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="plus-circle" />,
                }}
            />
            <BottomTab.Screen
                name="Configuracoes"
                component={ConfiguracoesScreen}
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