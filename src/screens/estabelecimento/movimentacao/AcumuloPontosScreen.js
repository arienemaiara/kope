import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Page from '../../../components/Page';
import HeaderButton from '../../../components/header/HeaderButton';
import {
    Label,
    DefaultButton,
    DefaultText,
    FormInput,
    SubTitle
} from '../../../components/StyledComponents';
import Colors from '../../../constants/Colors';
import { detalhePorCpf } from '../../../services/cliente';
import { criarMovimentacao } from '../../../services/movimentacao';

const AcumuloPontosScreen = props => {

    const [carregando, setCarregando] = useState(false);
    const [dadosCliente, setDadosCliente] = useState();
    const [qtdPontos, setQtdPontos] = useState();

    const cpf_cliente = props.route?.params?.cpf_cliente;

    useEffect(() => {
        const buscarDadosCliente = () => {
            setCarregando(true);
            detalhePorCpf(cpf_cliente)
                .then((response) => {
                    setDadosCliente(response.data);
                    setCarregando(false);
                })
                .catch((error) => {

                })
        };

        buscarDadosCliente();
    }, []);

    const handleConfirmar = () => {
        if (!qtdPontos || qtdPontos == 0) {
            Alert.alert('Erro', 'Quantidade de pontos deve ser maior que 0(zero)')
        }
        else {
            setCarregando(true);
            criarMovimentacao({
                cpf_usuario: cpf_cliente,
                qtd_pontos: qtdPontos,
                acumulo: true
            })
            .then((response) => {
                Alert.alert(
                    'Sucesso', 
                    'Pontos acumulados com sucesso!', 
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
                console.log(error)
                Alert.alert(
                    'Erro', 
                    'Erro ao acumular os pontos. Tente novamente.', 
                    [{
                        text: 'OK',
                        onPress: () => {
                            setCarregando(false);
                        }
                    }]
                );
            });
        }
    }

    return (
        <Page
            title="Acumular pontos para o cliente"
            headerBackButton={
                <HeaderButton
                    iconName='arrow-left'
                    onPress={() => props.navigation.goBack()} />
            }>
            <Spinner visible={carregando} />
            {dadosCliente && 
            <View style={styles.container}>
                <View>
                    <DefaultText color={Colors.grayText}>Acumulando pontos para:</DefaultText>
                    <SubTitle 
                        color={Colors.pinkText}
                        fontSize={22}>
                        {dadosCliente.nome}
                    </SubTitle>
                </View>
                <View style={styles.inputContainer}>
                    <Label>Quantidade de pontos</Label>
                    <FormInput
                        placeholder="Quantidade de pontos"
                        returnKeyType="next"
                        value={qtdPontos}
                        onChangeText={(value) => setQtdPontos(value)}
                    />
                    <DefaultButton
                        title="Confirmar"
                        backgroundColor={Colors.bgBtnSuccess}
                        style={{ marginVertical: 10 }}
                        onPress={handleConfirmar} />
                </View>
            </View>}


        </Page>
    )

};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputContainer: {
        marginTop: 30
    }
});

export default AcumuloPontosScreen;