import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SelecaoRecompensaScreen = props => {

    const cpf_cliente = props.route?.params?.cpf_cliente;

    return (
        <View>
            <Text>SelecaoRecompensaScreen</Text>
        </View>
    )

};

const styles = StyleSheet.create({

});

export default SelecaoRecompensaScreen;