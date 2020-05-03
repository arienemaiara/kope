import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const HeaderButton = props => {
    return (<TouchableOpacity
        onPress={props.onPress}>
        <Feather
            name={props.iconName}
            color='#fff'
            size={24}
        />
    </TouchableOpacity>)
};

export default HeaderButton;