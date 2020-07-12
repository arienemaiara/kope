import React, { useState, useEffect } from 'react';
import { 
    View, 
    Button,
    TouchableOpacity,
    Text, 
    Alert, 
    Keyboard,
    StyleSheet 
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Page from '../../components/Page';
import {
    CPFManual,
    Label,
    MaskedInput,
    ButtonTransparent,
    DefaultButton
} from '../../components/StyledComponents';
import Colors from '../../constants/Colors';

const LerQRCodeScreen = props => {

    const [acumuloPontos, setAcumuloPontos] = useState(true);
    const [informarClienteManual, setInformarClienteManual] = useState(false);
    const [cpfCliente, setCpfCliente] = useState();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const title = acumuloPontos ? 'Acumular pontos do cliente' : 'Resgatar pontos do cliente';
    let cpfInputRef;

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setCpfCliente(data);
        confirmarCPFCliente(data);
    };

    const confirmarCPFCliente = (cpf) => {
        if (!cpf) {
            Alert.alert('Erro', 'Informe o CPF do cliente para prosseguir.');
        }
        else {
            Keyboard.dismiss();
            if (acumuloPontos) {
                acumularPontosCliente(cpf);
            }
            else {
                resgatarPontosCliente(cpf);
            }
        }
    }

    const acumularPontosCliente = (cpf) => {
        props.navigation.navigate('AcumuloPontos', { cpf_cliente: cpf });
    }

    const resgatarPontosCliente = (cpf) => {
        props.navigation.navigate('SelecaoRecompensa', { cpf_cliente: cpf });
    }

    return (

        <Page title={title} headerHeight={100}>

            <ButtonTransparent
                title={informarClienteManual ? "Escanear QRCode cliente" : "Informar cliente manualmente"}
                titleSize={20}
                color={Colors.purpleText}
                onPress={() => setInformarClienteManual(!informarClienteManual)}
            />

            {!informarClienteManual ?
                <View style={styles.barcodeContainer}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
                : 
                <CPFManual>
                    <Label>CPF</Label>
                    <MaskedInput
                        type="cpf"
                        placeholder="Informe o CPF do cliente"
                        style={{ marginBottom: 10 }}
                        value={cpfCliente}
                        onChangeText={(value) => setCpfCliente(value)}
                        ref={(ref) => cpfInputRef = ref}
                    />
                    <DefaultButton
                        title="Confirmar"
                        backgroundColor={Colors.bgBtnSuccess}
                        style={{marginTop: 15}}
                        onPress={() => confirmarCPFCliente(cpfInputRef.getRawValue()) }
                    />
                </CPFManual>
            }
            <View style={styles.buttonGroup}>
                <ButtonTransparent 
                    title={"Acúmulo"}
                    color={acumuloPontos ? 'white' : Colors.pinkText}
                    titleSize={18}
                    style={[styles.buttonGroupItem, {
                        backgroundColor: acumuloPontos ? Colors.pinkText : 'white',
                        borderTopStartRadius: 8,
                        borderBottomStartRadius: 8
                    }]}
                    onPress={() => setAcumuloPontos(true)} />  

                <ButtonTransparent 
                    title={"Resgate"}
                    color={!acumuloPontos ? 'white' : Colors.pinkText}
                    titleSize={18}
                    style={[styles.buttonGroupItem, {
                        backgroundColor: !acumuloPontos ? Colors.pinkText : 'white',
                        borderTopEndRadius: 8,
                        borderBottomEndRadius: 8
                    }]}
                    onPress={() => setAcumuloPontos(false)}/>   
            </View>

        </Page>



    );
};

const styles = StyleSheet.create({
    barcodeContainer: {
        flex: 1,
        height: 350,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        margin: 10
    },
    buttonGroupItem: {
        justifyContent: 'center',
        width: 120,
        borderColor: Colors.pinkText,
        borderWidth: 1,
        
    }
});

export default LerQRCodeScreen;