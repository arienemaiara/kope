import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-generator';

import Page from '../../components/Page';
import Layout from '../../constants/Layout';
import AuthContext from '../../contexts/auth';

const QRCodeScreen = props => {

    const { user } = useContext(AuthContext);

    return (
        <Page
            title="Acúmulo ou Resgate de pontos">
            <View style={styles.container}>
                <Text>Mostre o QR code ao estabelecimento para fazer o acúmulo ou resgate de pontos</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});

export default QRCodeScreen;