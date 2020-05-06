import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
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
import { converterDistanciaKM } from '../../utils/helpers';
import api from '../../services/api';

const EstabelecimentosScreen = ({ navigation }) => {

    //const [location, setLocation] = useState();
    const [enderecosLista, setEnderecosLista] = useState([]);

    let location;

    const getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        location = await Location.getCurrentPositionAsync({});
    };

    useEffect(() => {
        (async () => {
            await getLocation();
            console.tron.log(location);
            carregarEnderecos();
        })();
    }, []);

    const carregarEnderecos = () => {
        console.tron.log(location);
        api.get('/estabelecimentos', {
            params: {
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
            }
        })
            .then((response) => {
                setEnderecosLista(response.data)
            })
    }

    const renderItem = (item) => {
        const { estabelecimento } = item;
        return (
            <ItemLista
                onPress={() => { navigation.navigate('RecompensasEstabelecimento', { estabelecimento, endereco: item }) }}>
                <ListText>{estabelecimento.nome}</ListText>
                {
                    item.distancia &&
                    <InfoText>{converterDistanciaKM(item.distancia)}km</InfoText>
                }
            </ItemLista>
        )
    }

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
            <FlatList
                data={enderecosLista}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderItem(item)} />
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