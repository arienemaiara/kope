import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';

const Background = props => {

    return (
        <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={[0.0, 0.0]}
            end={[1.0, 1.0]}
            style={styles.container}>
            {props.children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Background;