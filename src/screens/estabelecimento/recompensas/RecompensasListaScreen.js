import React, { useState, useEffect, useContext } from 'react';
import {
    FlatList
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Page from '../../../components/Page';
import HeaderButton from '../../../components/header/HeaderButton';
import RecompensaItem from '../../../components/RecompensaItem';
import SemRegistros from '../../../components/SemRegistros';

import AuthContext from '../../../contexts/auth';
import RecompensaContext from '../../../contexts/recompensa';

const RecompensasListaScreen = props => {

    const [recompensas, setRecompensas] = useState();
    const [page, setPage] = useState(0);
    const [loadingList, setLoadingList] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { user } = useContext(AuthContext);
    const { recompensasLista, carregarRecompensas, loading } = useContext(RecompensaContext);

    useEffect(() => {
        carregarRecompensas(page + 1);
    }, []);

    useEffect(() => {
        setRecompensas(recompensasLista);
    }, [recompensasLista]);

    const onAddHandler = () => {
        props.navigation.navigate('RecompensasCadastro');
    }

    const onItemPressHandler = (item) => {
        props.navigation.navigate('RecompensasCadastro', { item });
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
                    onRefresh={() => carregarRecompensas(1)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <RecompensaItem item={item} onPress={() => onItemPressHandler(item)} />}
                    // // onEndReached={() => {
                    // //     carregarRecompensas(page + 1)
                    // //     setPage(page + 1)
                    // // }}
                    // // onEndReachedThreshold={0.2}
                />
            )
        }
    }

    return (
        <Page
            title='Recompensas'
            headerRightButton={
                <HeaderButton iconName='plus' onPress={onAddHandler} />
            }>

            <Spinner visible={loading} />

            { renderListaRecompensas() }

        </Page>
    );
}

export default RecompensasListaScreen;