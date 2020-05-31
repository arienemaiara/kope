import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-generator';

import Page from '../../components/Page';
import Layout from '../../constants/Layout';
import AuthContext from '../../contexts/auth';

import { DefaultText } from '../../components/StyledComponents';

const QRCodeScreen = props => {

    const { user } = useContext(AuthContext);

    return (
        <Page
            title="Acúmulo/Resgate de pontos">
            <View style={styles.container}>
                <DefaultText fontSize={20} style={styles.text}>
                    Mostre o QR code ao estabelecimento para fazer o 
                    acúmulo ou resgate de pontos.
                </DefaultText>
                <QRCode
                    value={user.cpf}
                    size={250}
                    bgColor='black' />
            </View>
        </Page>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Layout.window.height - 90 - 150,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15
    },
    text: {
        textAlign: 'center'
    }
});

export default QRCodeScreen;