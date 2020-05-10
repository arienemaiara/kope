import React from 'react';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableOpacityBase
} from 'react-native';

import Colors from '../constants/Colors';

const IconButton = props => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.button}
            >
            <Feather 
                name={props.iconName}
                size={props.iconSize}
                color={props.color || Colors.defaultText}
            />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        margin: 10
    }
})

IconButton.propTypes = {
    iconName: PropTypes.string.isRequired,
    iconSize: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired
}

export default IconButton;