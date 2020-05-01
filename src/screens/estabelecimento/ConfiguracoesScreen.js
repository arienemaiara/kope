import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Page from '../../components/Page';
import { ItemLista, ListText } from '../../components/StyledComponents';
import Colors from '../../constants/Colors';

const ConfiguracoesScreen = props => {
    return (
        <Page title="Configurações">
            <ItemLista>
                <Feather name="user" style={styles.icon}/>
                <ListText>Editar Perfil</ListText>
            </ItemLista>
            <ItemLista>
                <Feather name="log-out" style={styles.icon}/>
                <ListText>Sair</ListText>
            </ItemLista>
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

export default ConfiguracoesScreen;