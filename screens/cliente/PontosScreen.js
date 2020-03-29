import React, { useState } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import {
    InfoText,
    ListText,
    DefaultInput,
    ItemLista
} from '../../components/StyledComponents';

import Page from '../../components/Page';
import Colors from '../../constants/Colors';

const PontosScreen = ({ navigation }) => {
    return (
        <Page title='Meus Pontos'>
            <View>
                <InfoText style={styles.infoText}>
                    Selecione o estabelecimento para ver seu extrato
                </InfoText>
                <View>
                    <ItemLista
                        onPress={() => { navigation.navigate('ExtratoPontos') }}>
                        <ListText>Lanchonete bom lanche</ListText>
                        <InfoText style={styles.pontosText}>10 pts</InfoText>
                    </ItemLista>
                </View>
            </View>
        </Page>
    );
};

const styles = StyleSheet.create({
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        padding: 30
    },
    pontosText: {
        color: Colors.greenText,
        fontSize: 16
    }
})

export default PontosScreen;