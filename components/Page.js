import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    Animated,
    ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';

import { Title } from '../styledComponents/DefaultStyle';

const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 180;

const Page = props => {
    const [scrollYAnimatedValue, setScrollYAnimatedValue] = useState(new Animated.Value(0));

    const headerHeight = scrollYAnimatedValue.interpolate({
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
    });

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.pageContent}
                scrollEventThrottle={10}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }]
                )}>
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
                    <Title>{props.title}</Title>
                </LinearGradient>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    headerContainer: {
        flex: 1,
        paddingTop: (Platform.OS == 'ios') ? 30 : 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageContent: {
        flex: 1,
        paddingTop: 20,
        borderRadius: 10,
        marginTop: HEADER_MAX_HEIGHT
    }
});

export default Page;