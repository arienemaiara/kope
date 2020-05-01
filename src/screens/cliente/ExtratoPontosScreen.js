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

const PontosScreen = props => {
    return (
        <Page title="Extrato de pontos">
            <View>
                <InfoText style={styles.infoText}>
                    Selecione o estabelecimento para ver seu extrato
                </InfoText>
                <View>
                    <ItemLista>
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