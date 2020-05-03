import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Keyboard,
    StyleSheet
} from 'react-native';

import AuthContext from '../contexts/auth';
import { Container, ButtonTransparent, Label, DefaultButton, FormInput } from '../components/StyledComponents';
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
        const navigateTo = tipoUsuario === 'cliente' ? 'CadastroCliente' : 'CadastroEstabelecimento';

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
                <ButtonTransparent
                    title="Novo por aqui? Cadastre-se"
                    color={Colors.blueText}
                    onPress={() => props.navigation.navigate(navigateTo)}
                />
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Text style={styles.loginTitle}>Login</Text>
                {renderLogin()}
                <ButtonTransparent
                    title={showLoginText()}
                    titleSize={18}
                    color={Colors.purpleText}
                    style={styles.buttonChangeType}
                    onPress={changeUserType}
                />
            </Container>
        </TouchableWithoutFeedback>
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
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 40,
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.inputBorder
    },
});

export default LoginScreen;