import React from 'react';
import PropTypes from 'prop-types';
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
            {props.children}
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

SemRegistros.propTypes = {
    message: PropTypes.string.isRequired
}

export default SemRegistros;