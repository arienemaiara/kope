import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import TabBarIcon from '../../components/TabBarIcon';
import RecompensasListaScreen from '../../screens/estabelecimento/recompensas/RecompensasListaScreen';
import ResgatesScreen from '../../screens/estabelecimento/ResgatesScreen';
import ConfiguracoesScreen from '../../screens/estabelecimento/ConfiguracoesScreen';
import LerQRCodeScreen from '../../screens/estabelecimento/LerQRCodeScreen';
import CadastroScreen from '../../screens/cliente/CadastroScreen';
import Colors from '../../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Recompensas';

export default BottomTabNavigator = ({ navigation, route }) => {

    navigation.setOptions({ headerTitle: getHeaderTitle(route), headerTintColor: 'red' });

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
                component={ResgatesScreen}
                options={{
                    title: "Estabelecimentos",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="shopping-cart" />,
                }}
            />
            <BottomTab.Screen
                name="Pontos"
                component={RecompensasListaScreen}
                options={{
                    title: "Pontos",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="star" />
                }}
            />
            <BottomTab.Screen
                name="QRCode"
                component={LerQRCodeScreen}
                options={{
                    title: "Mostrar QRCode",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="plus-circle" />,
                }}
            />
            <BottomTab.Screen
                name="Configuracoes"
                component={CadastroScreen}
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