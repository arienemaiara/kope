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
import Spinner from 'react-native-loading-spinner-overlay';

import Page from '../../components/Page';
import SemRegistros from '../../components/SemRegistros';
import AvatarImagem from '../../components/AvatarImagem';
import { InfoText, ListText, DefaultInput, ItemLista, Row, Column } from '../../components/StyledComponents';

import Colors from '../../constants/Colors';


import { converterDistanciaKM } from '../../utils/helpers';
import api from '../../services/api';

const EstabelecimentosScreen = ({ navigation }) => {

    const [carregando, setCarregando] = useState(false);
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
        setCarregando(true);
        api.get('/estabelecimentos', {
            params: {
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
            }
        })
        .then((response) => {
            setEnderecosLista(response.data)
        })
        .finally(() => {
            setCarregando(false);
        })
    }

    const renderLista = () => {
        if (!enderecosLista || enderecosLista.length === 0) {
            return (
                <SemRegistros message='Nenhum estabelecimento encontrado' />
            )
        }
        else {
            return (
                <FlatList
                    data={enderecosLista}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderItem(item)} />
            )
        }
        
    }

    const renderItem = (item) => {
        const { estabelecimento } = item;
        return (
            <ItemLista
                onPress={() => { 
                    navigation.navigate('RecompensasEstabelecimento', { estabelecimento, endereco: item }) 
                }}>
                <Row>
                    <AvatarImagem imagem_url={estabelecimento.avatar_url} />
                    <Column>
                        <ListText>{estabelecimento.nome}</ListText>
                        {
                            item.distancia &&
                            <InfoText>{converterDistanciaKM(item.distancia)}km</InfoText>
                        }
                    </Column>
                </Row>
                
            </ItemLista>
        )
    }

    return (
        <Page 
            title='Estabelecimentos Participantes'>
            <Spinner visible={carregando} />
            <View style={styles.buscar}>
                <Feather
                    name="search"
                    style={styles.buscarIcon}
                />
                <DefaultInput
                    placeholder="Procurar estabelecimento"
                    style={styles.buscarText} />
            </View>
            { renderLista() }
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