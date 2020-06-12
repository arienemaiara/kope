import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    Animated,
    ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';


import Colors from '../constants/Colors';
import { Title } from './StyledComponents';

let HEADER_MAX_HEIGHT = 130;

const ListPage = props => {

    return (
        <View style={styles.container}>
            <View
                style={[styles.header,
                { height: HEADER_MAX_HEIGHT }]}>
                <LinearGradient
                    colors={[Colors.gradientStart, Colors.gradientEnd]}
                    start={[0.0, 0.0]}
                    end={[1.0, 1.0]}
                    style={styles.headerContainer}>
                    {props.headerBackButton}
                    <Title>{props.title}</Title>
                    {props.headerRightButton}
                </LinearGradient>
            </View>
            <View style={styles.pageContent}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: (Platform.OS == 'ios') ? 30 : 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageContent: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: HEADER_MAX_HEIGHT,
    }
});

ListPage.propTypes = {
    title: PropTypes.string.isRequired,
    headerHeight: PropTypes.number,
    headerBackButton: PropTypes.element,
    headerRightButton: PropTypes.element,
};

export default ListPage;