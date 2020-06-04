import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import Page from '../../components/Page';
import HeaderButton from '../../components/header/HeaderButton';
import { Row, Column, SubTitle, DefaultText, InfoText } from '../../components/StyledComponents';
import Colors from '../../constants/Colors';

const EstabelecimentoDetalheScreen = (props) => {

    const estabelecimento = props.route?.params?.estabelecimento;
    const endereco = props.route?.params?.endereco;
    const longitude = endereco.coordenadas.coordinates[0];
    const latitude = endereco.coordenadas.coordinates[1];
    const coordenadasMapa = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const makerCoordenada = {
        latitude,
        longitude,
    };

    return (
        <Page
            title={estabelecimento.nome}
            headerBackButton={
                <HeaderButton
                    iconName='arrow-left'
                    onPress={() => props.navigation.goBack()} />
            }>
            <View>
                <MapView
                    style={{height: 300}}
                    initialRegion={coordenadasMapa}
                >
                    <Marker
                        coordinate={makerCoordenada}
                        title={estabelecimento.nome}
                    ></Marker>
                </MapView>
            </View>
            <View style={styles.enderecoInfo}>
                <SubTitle color={Colors.pinkText}>Informações</SubTitle>
                <Row padding={10}>
                    <Feather name='map-pin' style={styles.enderecoIcon} />
                    <Column>
                        <DefaultText>{endereco.endereco}, {endereco.numero}</DefaultText>
                        <DefaultText>{endereco.bairro}</DefaultText>
                        <DefaultText>{endereco.cidade} - {endereco.estado}</DefaultText>
                    </Column>
                </Row>
                <Row padding={10}>
                    <Feather name='mail' style={styles.enderecoIcon} />
                    <DefaultText>{estabelecimento.email}</DefaultText>
                </Row>
                <Row padding={10}>
                    <Feather name='phone' style={styles.enderecoIcon} />
                    <DefaultText>{estabelecimento.telefone}</DefaultText>
                </Row>
            </View>
        </Page>
    );
};

const styles = StyleSheet.create({
    enderecoInfo: {
        margin: 15
    },
    enderecoIcon: {
        marginRight: 10,
        fontSize: 24,
        color: Colors.defaultText
    }
});

export default EstabelecimentoDetalheScreen;