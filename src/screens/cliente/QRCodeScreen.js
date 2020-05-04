import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-generator';

import Page from '../../components/Page';
import Layout from '../../constants/Layout';
import AuthContext from '../../contexts/auth';

const QRCodeScreen = props => {

    const { user } = useContext(AuthContext);

    return (
        <Page
            title="QR Code">
            <View style={styles.container}>
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