import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    Animated,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import Background from './Background';
import { Title } from './StyledComponents';

let HEADER_MIN_HEIGHT = 100;
let HEADER_MAX_HEIGHT = 150;

const Page = props => {
    const [scrollOffset, setScrollOffset] = useState(new Animated.Value(0));

    if (props.headerHeight) 
        HEADER_MAX_HEIGHT = props.headerHeight;

    const headerHeight = scrollOffset.interpolate({
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
    });

    return (
        <View style={styles.container}>

            <ScrollView
                contentContainerStyle={{
                    marginTop: HEADER_MAX_HEIGHT,
                    paddingBottom: HEADER_MAX_HEIGHT,
                }}
                scrollEventThrottle={10}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffset } } }]
                )}
            >
                {props.children}
            </ScrollView>

            <Animated.View
                style={[styles.header,
                { height: headerHeight }]}>
                <LinearGradient
                    colors={[Colors.gradientStart, Colors.gradientEnd]}
                    start={[0.0, 0.0]}
                    end={[1.0, 1.0]}
                    style={styles.headerContainer}>
                    {props.headerBackButton}
                    <Title>{props.title}</Title>
                    {props.headerRightButton}
                </LinearGradient>
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        marginTop: HEADER_MAX_HEIGHT,
        paddingBottom: HEADER_MAX_HEIGHT,

    }
});

export default Page;