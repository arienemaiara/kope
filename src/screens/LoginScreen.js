import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthContext from '../contexts/auth';

const LoginScreen = props => {

    const { signed, signIn } = useContext(AuthContext);

    const handleLogin = () => {
        signIn();
    }

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>Login</Text>
            <Button title="ENTRAR" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default LoginScreen;