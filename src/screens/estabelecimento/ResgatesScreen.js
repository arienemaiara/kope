import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Page from '../../components/Page';
import SemRegistros from '../../components/SemRegistros';
import {
    InfoText,
    ListText,
    DefaultText,
    ItemLista
} from '../../components/StyledComponents';


import Colors from '../../constants/Colors';

import api from '../../services/api';

const ResgatesScreen = props => {

    const [resgatesLista, setResgatesLista] = useState([]);
    const [page, setPage] = useState(1);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarResgates();
    }, []);

    const carregarResgates = () => {
        setCarregando(true);
        api.get('/estabelecimentos/movimentacao', {
            params: {
                page
            }
        })
            .then((response) => {
                setCarregando(false);
                setResgatesLista(response.data);
            })
            .catch((error) => {
                setCarregando(false);
            });
    }

    const renderListaResgates = () => {
        if (!resgatesLista || resgatesLista.length === 0) {
            return (
                <SemRegistros message='Nenhum resgate realizado ainda.' />
            )
        }
        else {
            return (
                <FlatList
                    data={resgatesLista}
                    refreshing={false}
                    onRefresh={() => carregarResgates()}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderItem(item)}
                />
            )
        }
    }

    const renderItem = (item) => {
        return (
            <ItemLista style={styles.itemContainer}>
                <View>
                    <ListText>{item.qtd_pontos} pts</ListText>
                    <InfoText>{item.created_at}h</InfoText>
                </View>
                <View>
                    <InfoText>{item.cliente.nome}</InfoText>
                </View>
            </ItemLista>
        )
    };

    return (
        <Page title="Resgates">
            <Spinner visible={carregando} />

            {renderListaResgates()}
        </Page>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
});

export default ResgatesScreen;