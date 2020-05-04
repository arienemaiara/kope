import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Page from '../../components/Page';
import HeaderButton from '../../components/header/HeaderButton';
import { ItemLista, DefaultText, InfoText } from '../../components/StyledComponents';
import Colors from '../../constants/Colors';

const RecompensasEstabelecimentoScreen = ({ navigation }) => {
    return (
        <Page
            title="detalhe"
            headerBackButton={
                <HeaderButton
                    iconName='arrow-left'
                    onPress={() => navigation.goBack()} />
            }>
        </Page>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginRight: 10,
        color: Colors.defaultText,
        fontSize: 26
    }
});

export default RecompensasEstabelecimentoScreen;