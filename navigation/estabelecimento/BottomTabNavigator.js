import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import TabBarIcon from '../../components/TabBarIcon';
import RecompensasListaScreen from '../../screens/estabelecimento/recompensas/RecompensasListaScreen';
import ResgatesScreen from '../../screens/estabelecimento/ResgatesScreen';
import ConfiguracoesScreen from '../../screens/estabelecimento/ConfiguracoesScreen';
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
                name="Recompensas"
                component={RecompensasListaScreen}
                options={{
                    title: "Recompensas",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-star" />
                }}
            />
            <BottomTab.Screen
                name="Resgates"
                component={ResgatesScreen}
                options={{
                    title: "Resgates",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-paper-plane" />,
                }}
            />
            <BottomTab.Screen
                name="QRCode"
                component={ConfiguracoesScreen}
                options={{
                    title: "Ler QRCode",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add-circle" />,
                }}
            />
            <BottomTab.Screen
                name="Configuracoes"
                component={ConfiguracoesScreen}
                options={{
                    title: "Configurações",
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-settings" />,
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