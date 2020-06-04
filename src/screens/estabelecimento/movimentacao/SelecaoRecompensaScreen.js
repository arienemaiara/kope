import React, { useEffect, useState, useContext } from 'react';
import { FlatList, Alert, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Page from '../../../components/Page';
import HeaderButton from '../../../components/header/HeaderButton';
import RecompensaItem from '../../../components/RecompensaItem';
import SemRegistros from '../../../components/SemRegistros';

import { criarMovimentacao } from '../../../services/movimentacao';

import RecompensaContext from '../../../contexts/recompensa';

const SelecaoRecompensaScreen = props => {

    const [recompensas, setRecompensas] = useState([]);

    const cpf_cliente = props.route?.params?.cpf_cliente;
    const { recompensasLista, carregarRecompensas, loading } = useContext(RecompensaContext);

    const [carregando, setCarregando] = useState(loading);

    useEffect(() => {
        carregarRecompensas(1);
    }, []);

    useEffect(() => {
        setRecompensas(recompensasLista);
    }, [recompensasLista]);

    const onItemPressHandler = (item) => {
        resgatarPontos(item.qtd_pontos);
    }

    const resgatarPontos = (qtd_pontos) => {
        setCarregando(true);
        criarMovimentacao({
            cpf_usuario: cpf_cliente,
            qtd_pontos,
            acumulo: false
        })
        .then((response) => {
            Alert.alert(
                'Sucesso', 
                'Pontos resgatados com sucesso!', 
                [{
                    text: 'OK',
                    onPress: () => {
                        setCarregando(false);
                        props.navigation.goBack();
                    }
                }]
            );
        })
        .catch((error) => {
            console.tron.log(error.response)
            let errorMessage = error.response.data?.messages || 'Erro ao resgatar os pontos. Tente novamente.';
            Alert.alert(
                'Erro', 
                errorMessage, 
                [{
                    text: 'OK',
                    onPress: () => {
                        setCarregando(false);
                    }
                }]
            );
        });
    }

    const renderListaRecompensas = () => {
        if (!recompensas || recompensas.length === 0) {
            return (
                <SemRegistros message='Nenhuma recompensa cadastrada ainda.' />
            )
        }
        else {
            return (
                <FlatList
                    data={recompensas}
                    refreshing={false}
                    onRefresh={() => console.tron.log('refreshin')}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <RecompensaItem item={item} onPress={() => onItemPressHandler(item)} />}
                />
            )
        }
    }

    return (
        <Page
            title='Selecione a recompensa para resgate'
            headerHeight={120}
            headerBackButton={
                <HeaderButton
                    iconName='arrow-left'
                    onPress={() => props.navigation.goBack()} />
            }>

            <Spinner visible={carregando} />

            { renderListaRecompensas() }

        </Page>
    );

};

const styles = StyleSheet.create({

});

export default SelecaoRecompensaScreen;