import React, { useContext } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import EstabelecimentoNavigator from './estabelecimento/EstabelecimentoNavigator';
import ClienteNavigator from './cliente/ClienteNavigator';

import AuthContext from '../contexts/auth';

const MainNavigator = props => {

    const { signed, userType, user } = useContext(AuthContext);

    console.log('signed', signed)
    console.log('user', user)

    const renderNavigation = () => {
        return userType === 'estabelecimento' 
            ? <EstabelecimentoNavigator /> 
            : <ClienteNavigator />
    }

    return (

            <NavigationContainer>
                {
                    signed === true ? renderNavigation()
                    : <AuthNavigator />
                }
            </NavigationContainer>

    )

};

export default MainNavigator;
