import React, { useState } from 'react';
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    Platform,
    Animated,
    ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Page from '../../components/Page';
import Colors from '../../constants/Colors';
import { InfoText, ListText, DefaultInput, ItemLista } from '../../components/StyledComponents';

const EstabelecimentosScreen = props => {
    return (
        <Page title='Estabelecimentos Participantes'>
            <View style={styles.buscar}>
                <Feather 
                    name="search"
                    style={styles.buscarIcon}
                />
                <DefaultInput 
                    placeholder="Procurar estabelecimento"
                    style={styles.buscarText} />
            </View>
            <View style={styles.listContainer}>
                <ItemLista>
                    <ListText>Lanchonete bom lanche</ListText>
                    <InfoText>Lanchonetes</InfoText>
                    <InfoText>0,8km</InfoText>
                </ItemLista>
            </View>
        </Page>
    );
};

const styles = StyleSheet.create({
    buscar: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 20,
    },
    buscarText: {
        flex: 1,
        paddingLeft: 40
    },
    buscarIcon: {
        position: 'absolute',
        marginLeft: 10,
        marginTop: 10,
        fontSize: 22,
        color: Colors.lightGray
    },
    listContainer: {

    }
})

export default EstabelecimentosScreen;