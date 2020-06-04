import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {
    InfoText,
    ListText,
    DefaultText,
    ItemLista
} from '../../components/StyledComponents';

import Page from '../../components/Page';
import HeaderButton from '../../components/header/HeaderButton';
import Colors from '../../constants/Colors';
import api from '../../services/api';


const ExtratoPontosScreen = props => {

    const [carregando, setCarregando] = useState(false);
    const [page, setPage] = useState(1);
    const [extratoLista, setExtratoLista] = useState([]);
    const [saldoAtual, setSaldoAtual] = useState(0);

    const { estabelecimento_id, estabelecimento_nome } = props.route?.params;

    useEffect(() => {
        const carregarExtrato = () => {
            setCarregando(true);
            api.get('/movimentacoes', {
                params: {
                    page,
                    estabelecimento_id
                }
            })
                .then((response) => {
                    setCarregando(false);
                    setExtratoLista(response.data.movimentacoes);
                    setSaldoAtual(response.data.total_pontos)
                })
                .catch((error) => {
                    setCarregando(false);
                });
        };

        carregarExtrato();
    }, []);

    const renderItem = (item) => {
        return (
            <ItemLista style={styles.itemContainer}>
                <View>
                    {
                        item.acumulo === true ?
                        <ListText style={{ color: Colors.greenText}}>Acúmulo</ListText>
                        : <ListText style={{ color: Colors.redText}}>Resgate</ListText>
                    }
                    <InfoText 
                        style={[styles.pontosText, { color: item.qtd_pontos > 0 ? Colors.greenText : Colors.redText }]}>
                        {item.qtd_pontos} <InfoText>pts</InfoText>
                    </InfoText>
                </View>
                <View>
                    <InfoText>{item.created_at}h</InfoText>
                </View>
            </ItemLista>
        )
    };

    return (
        <Page
            title={"Extrato de pontos em " + estabelecimento_nome}
            headerBackButton={
                <HeaderButton
                    iconName='arrow-left'
                    onPress={() => props.navigation.goBack()} />
            }>
            <Spinner visible={carregando} />
            <View>
                <View style={styles.saldoInfo}>
                    <DefaultText fontSize={20} color={Colors.grayText}>Saldo Atual</DefaultText>
                    <DefaultText fontSize={22}>{saldoAtual} pontos</DefaultText>
                </View>
                <FlatList
                    data={extratoLista}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderItem(item)} />
            </View>
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
    saldoInfo: {
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.listSeparator,
        borderBottomWidth: 1,
    }
})

export default ExtratoPontosScreen;