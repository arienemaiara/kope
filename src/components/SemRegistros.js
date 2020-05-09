import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import {
    DefaultText
} from './StyledComponents';

import Layout from '../constants/Layout';

const SemRegistros = props => {
    return (
        <View style={styles.container}>
            <DefaultText style={styles.text}>{props.message}</DefaultText>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: Layout.window.height - 90 - 150,
        justifyContent: 'center',
        padding: 20
    },
    text: {
        textAlign: 'center'
    }
});

export default SemRegistros;