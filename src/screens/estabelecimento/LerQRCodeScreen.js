import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Page from '../../components/Page';
import { 
    FullContainer, 
    ShadowBox,
    Label,
    MaskedInput, 
    ButtonTransparent,
    DefaultButton } from '../../components/StyledComponents';
import Colors from '../../constants/Colors';

const LerQRCodeScreen = props => {

    const [acumuloPontos, setAcumuloPontos] = useState(true);
    const [exibirInputCliente, setExibirInputCliente] = useState(true);
    const [cpfCliente, setCpfCliente] = useState();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const title = acumuloPontos ? 'Acumular pontos do cliente' : 'Resgatar pontos do cliente';

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const confirmarCPFCliente = () => {
        if (!cpfCliente) {
            Alert.alert('Erro', 'Informe o CPF do cliente para prosseguir.')
        }
        else {
            //props.navigation.navigate('DadosCliente', { cpf_cliente: cpfCliente });
            if (acumuloPontos) {
                acumularPontosCliente();
            }
            else {
                resgatarPontosCliente();
            }
        }
    }

    const acumularPontosCliente = () => {

    }

    const resgatarPontosCliente = () => {

    }
 
    return (
        <Page title={title}>
            <FullContainer style={{justifyContent: 'space-between'}}>
                <View>

                </View>
                <View>
                    <ButtonTransparent
                        title="Informar cliente manualmente"
                        titleSize={20}
                        color={Colors.purpleText}
                    />
                    {
                        exibirInputCliente &&
                        <ShadowBox>
                            <Label>CPF</Label>
                            <MaskedInput 
                                type="cpf"
                                placeholder="Informe o CPF do cliente"
                                style={{marginBottom: 10}}
                                value={cpfCliente}
                                onChangeText={(value) => setCpfCliente(value)}
                            />
                            <DefaultButton 
                                title="Confirmar"
                                backgroundColor={Colors.bgBtnSuccess}
                                onPress={confirmarCPFCliente}
                            />
                        </ShadowBox>
                    }
                    
                </View>
                <View>
                    <ButtonTransparent
                        title={acumuloPontos ? "Efetuar resgate de pontos" : "Efetuar acúmulo de pontos"}
                        titleSize={20}
                        color={Colors.purpleText}
                        onPress={() => setAcumuloPontos(!acumuloPontos)}
                    />
                </View>
            </FullContainer>
            {/* <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
        </Page>
    );
};

const styles = StyleSheet.create({
});

export default LerQRCodeScreen;