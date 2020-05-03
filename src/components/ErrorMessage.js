import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ErrorMessage = ({ errorValue }) => (
    <View style={styles.container}>
        <Text style={styles.errorText}>{errorValue}</Text>
    </View>
)

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontFamily: 'circular-std'
    }
})

export default ErrorMessage;