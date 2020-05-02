import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AuthContext from '../contexts/auth';

import { Container, Title, Label, DefaultButton, FormInput } from '../components/StyledComponents';
import Colors from '../constants/Colors';

const LoginScreen = props => {

    const [tipoUsuario, setTipoUsuario] = useState('cliente');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const { signIn } = useContext(AuthContext);

    const handleLogin = () => {
        signIn(tipoUsuario, usuario, senha)
            .catch((error) => {
                Alert.alert('Erro', error);
                setUsuario('');
                setSenha('');
            });
    }

    const renderLogin = () => {

        const label = tipoUsuario === 'cliente' ? 'CPF' : 'CPF/CNPJ';

        return (
            <View style={styles.inputContainer}>
                <Label>{label}</Label>
                <FormInput
                    placeholder={`Digite seu ${label}`}
                    keyboardType="numeric"
                    value={usuario}
                    onChangeText={setUsuario} />

                <Label>Senha</Label>
                <FormInput
                    placeholder="Digite sua senha"
                    secureTextEntry={true}
                    textContentType="password"
                    value={senha}
                    onChangeText={setSenha}
                />
                <DefaultButton
                    title="Entrar"
                    backgroundColor={Colors.bgBtnSuccess}
                    style={{ marginVertical: 20 }}
                    onPress={handleLogin} />
            </View>
        )
    }

    const changeUserType = () => {
        if (tipoUsuario === 'cliente') {
            setTipoUsuario('estabelecimento');
        }
        else {
            setTipoUsuario('cliente');
        }
    }

    const showLoginText = () => {
        return tipoUsuario === 'cliente'
            ? 'Entrar como Estabelecimento'
            : 'Entrar como Cliente'
    }

    return (
        <Container>
            <Text style={styles.loginTitle}>Login</Text>
            {renderLogin()}
            <TouchableOpacity
                style={styles.buttonChangeType}
                onPress={changeUserType}>
                <Text style={styles.textChangeType}>{showLoginText()}</Text>
            </TouchableOpacity>
        </Container>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        margin: 15
    },
    loginTitle: {
        textAlign: 'center',
        fontSize: 32,
        color: Colors.blueText
    },
    buttonChangeType: {

    },
    textChangeType: {
        color: Colors.purpleText,
        textAlign: 'center',
        fontSize: 16
    }
});

export default LoginScreen;