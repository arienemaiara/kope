import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Page from '../../components/Page';
import { ItemLista, DefaultText, InfoText } from '../../components/StyledComponents';
import Colors from '../../constants/Colors';

const RecompensasEstabelecimentoScreen = ({ navigation }) => {
    return (
        <Page title="detalhe">
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