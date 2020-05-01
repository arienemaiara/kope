import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Page from '../../components/Page';
import { ItemLista, DefaultText, InfoText, ListText } from '../../components/StyledComponents';
import Colors from '../../constants/Colors';

const RecompensasEstabelecimentoScreen = ({ navigation }) => {
    return (
        <Page title="Lachonete Bom Lanche">
            <View>
                <View>
                    <InfoText>Lanchonetes</InfoText>
                    <InfoText>0,8 km</InfoText>
                </View>
                <View>
                    <InfoText>Sobre o estabelecimento</InfoText>
                    <InfoText>Ver mais informações</InfoText>
                </View>
            </View>
            <View>
                <DefaultText>Você possui xx pontos nesse estabelecimento</DefaultText>
            </View>
            <View>
                <ItemLista
                    onPress={() => { }}>
                    <ListText>Açaí 500ml</ListText>
                    <InfoText>50pts</InfoText>
                </ItemLista>
                <ItemLista
                    onPress={() => { }}>
                    <ListText>X-Salada</ListText>
                    <InfoText>50pts</InfoText>
                </ItemLista>
            </View>
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