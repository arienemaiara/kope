import React from 'react';
import { View, StyleSheet } from 'react-native';

import Page from '../../components/Page';
import { Label, DefaultButton, FormInput } from '../../components/StyledComponents';
import Colors from '../../constants/Colors';

const CadastroScreen = props => {
    return (
        <Page title="Cadastre-se">
            <View style={styles.container}>
                <Label>CPF</Label>
                <FormInput placeholder="" />

                <Label>Nome Completo</Label>
                <FormInput placeholder="" />

                <Label>E-mail</Label>
                <FormInput placeholder="" />

                <Label>Celular</Label>
                <FormInput placeholder="" />

                <Label>Senha</Label>
                <FormInput placeholder="" />

                <Label>Confirmar senha</Label>
                <FormInput placeholder="" />

                <DefaultButton 
                    title="SALVAR" 
                    backgroundColor={Colors.bgBtnSuccess}
                    style={{marginVertical: 20}} />
            </View>
        </Page>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
});

export default CadastroScreen;