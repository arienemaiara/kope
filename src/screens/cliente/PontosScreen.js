import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Alert,
    StyleSheet
} from 'react-native';

import {
    InfoText,
    ListText,
    DefaultText,
    DefaultInput,
    ItemLista
} from '../../components/StyledComponents';
import SemRegistros from '../../components/SemRegistros';

import Page from '../../components/Page';
import Colors from '../../constants/Colors';
import api from '../../services/api';

const PontosScreen = ({ navigation }) => {

    const [pontosLista, setPontosLista] = useState([]);

    useEffect(() => {
        carregarListaPontos();
    }, []);

    const carregarListaPontos = () => {
        api.get('/pontosPorEstabelecimento')
            .then((response) => {
                setPontosLista(response.data);
            })
            .catch((error) => {
                Alert.alert('Erro', 'Erro ao buscar pontuação')
            });
    }

    const renderItem = (item) => {
        const { estabelecimento } = item;
        return (
            <ItemLista
                onPress={() => {
                    navigation.navigate('ExtratoPontos',
                        { estabelecimento_id: estabelecimento.id, estabelecimento_nome: estabelecimento.nome })
                }}>
                <ListText>{estabelecimento.nome}</ListText>
                <InfoText style={styles.pontosText}>{item.total_pontos} pts</InfoText>
            </ItemLista>
        )
    }

    return (
        <Page
            title='Meus Pontos'>
            {
                pontosLista.length === 0 ?
                <SemRegistros message="Você ainda não pontuou em nenhum estabelecimento." />
                :
                <View>
                    <InfoText style={styles.infoText}>
                        Selecione o estabelecimento para ver seu extrato
                    </InfoText>
                    <FlatList
                        data={pontosLista}
                        keyExtractor={(item) => item.estabelecimento.id}
                        renderItem={({ item }) => renderItem(item)} />
                </View>
            }

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