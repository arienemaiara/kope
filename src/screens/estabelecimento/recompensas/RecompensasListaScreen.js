import React, { useState, useEffect, useContext } from 'react';
import {
    FlatList,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Animated,
    ScrollView
} from 'react-native';

import api from '../../../services/api';

import { Container } from '../../../components/StyledComponents';

import Page from '../../../components/Page';
import HeaderButton from '../../../components/header/HeaderButton';
import RecompensaItem from './RecompensaItem';

import AuthContext from '../../../contexts/auth';

const RecompensasListaScreen = props => {

    const [recompensasLista, setRecompensasLista] = useState();

    const { user } = useContext(AuthContext);

    useEffect(() => {

        const carregarRecompensas = async () => {
            api.get('/recompensas', {
                params: {
                    page: 1,
                    estabelecimento_id: user.id
                }
            })
            .then((response) => {
                setRecompensasLista(response.data);
            })
            .catch((error) => {

            })
        };

        carregarRecompensas();

    }, []);

    const onAddHandler = () => {
        props.navigation.push('RecompensasCadastro');
    }

    // const renderRecompensaItem = (item) => {
    //     return (
    //         <TouchableOpacity>
    //             <Text>{item.descricao}</Text>
    //             <Text>{item.qtd_pontos}</Text>           
    //         </TouchableOpacity>
            
    //     )
    // }

    return (
        <Page 
            title='Recompensas'
            headerRightButton={
                <HeaderButton iconName='plus' onPress={onAddHandler} />
            }>
            <Container>
                <FlatList 
                    data={recompensasLista}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <RecompensaItem item={item} />}
                />
            </Container>
        </Page>
    );
}

export default RecompensasListaScreen;