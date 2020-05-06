import React, { useState, useEffect } from 'react';
import { View, FlatList, Linking, StyleSheet } from 'react-native';

import Page from '../../components/Page';
import HeaderButton from '../../components/header/HeaderButton';
import RecompensaItem from '../../components/RecompensaItem';
import { ItemLista, DefaultText, InfoText, SubTitle } from '../../components/StyledComponents';
import Colors from '../../constants/Colors';
import * as recompensasService from '../../services/recompensas';
import { converterDistanciaKM } from '../../utils/helpers';

const RecompensasEstabelecimentoScreen = (props) => {

    const [page, setPage] = useState(1);
    const [recompensasLista, setRecompensasLista] = useState([]);

    const estabelecimento = props.route?.params?.estabelecimento;
    const endereco = props.route?.params?.endereco;

    const buscarRecompensas = () => {
        recompensasService.buscar(page, estabelecimento.id)
            .then((response) => {
                setRecompensasLista(response.data);
            })
    }

    useEffect(() => {
        buscarRecompensas();
    }, []);

    return (
        <Page
            title={estabelecimento.nome}
            headerBackButton={
                <HeaderButton
                    iconName='arrow-left'
                    onPress={() => props.navigation.goBack()} />
            }>
            <View style={styles.estabelecimentoInfo}>
                <InfoText>{converterDistanciaKM(endereco.distancia)} km</InfoText>
                <View>
                    <DefaultText fontSize={16}>Sobre o estabelecimento</DefaultText>
                    <DefaultText 
                        color={Colors.pinkText} 
                        onPress={() => { 
                            props.navigation.navigate('EstabelecimentoDetalhe', { estabelecimento, endereco } ) 
                        }}>
                        Ver mais informações >
                    </DefaultText>
                </View>
            </View>
            <View style={{justifyContent: 'center'}}>
                <SubTitle color={Colors.greenText}>Produtos disponíveis para regaste</SubTitle>
                <FlatList
                    data={recompensasLista}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <RecompensaItem item={item} onPress={() => {}} />}
                />
            </View>
        </Page>
    );
};

const styles = StyleSheet.create({
    estabelecimentoInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    }
});

export default RecompensasEstabelecimentoScreen;