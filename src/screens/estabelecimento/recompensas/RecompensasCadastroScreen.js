import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Page from '../../../components/Page';
import HeaderButton from '../../../components/header/HeaderButton';

import { Container } from '../../../components/StyledComponents';

const RecompensasCadastroScreen = props => {

    const { item } = props.route.params;
    const title = item ? 'Editar Recompensa' : 'Cadastrar Recompensa';

    console.tron.log(item);

    const onBackHandler = () => {
        props.navigation.goBack();
    }

    const onSaveHandler = () => {

    }

    return (
        <Page 
            title={title}
            headerBackButton={
                <HeaderButton iconName='arrow-left' onPress={onBackHandler} />
            }
            headerRightButton={
                <HeaderButton iconName='save' onPress={onSaveHandler} />
            }>
            <Container>
                
            </Container>
        </Page>
    );
};

const styles = StyleSheet.create({

});

export default RecompensasCadastroScreen;