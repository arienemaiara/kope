import React, { Fragment, useState, useContext, useRef } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Alert,
    Keyboard,
    StyleSheet,
    Image,
    StatusBar
} from 'react-native';

import AuthContext from '../contexts/auth';
import {
    Container,
    ButtonTransparent,
    Label,
    DefaultButton,
    FormInput,
    MaskedInput
} from '../components/StyledComponents';
import Colors from '../constants/Colors';
import Background from '../components/Background';
import ErrorMessage from '../components/ErrorMessage';

const LoginScreen = props => {

    const [tipoUsuario, setTipoUsuario] = useState('cliente');

    const { signIn } = useContext(AuthContext);

    let usuarioInputRef;

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Informe o e-mail')
            .email('Digite um e-mail válido'),
        senha: Yup.string()
            .required('Informe a senha')
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
    });

    const handleLogin = (formValues) => {
        const email = formValues.email;
        const senha = formValues.senha;
        signIn(tipoUsuario, email, senha)
            .catch((error) => {
                Alert.alert('Erro', error);
            });
    }


    const renderLogin = () => {

        const navigateTo = tipoUsuario === 'cliente' ? 'CadastroCliente' : 'CadastroEstabelecimento';

        return (
            <View style={styles.inputContainer}>
                <Formik
                    initialValues={{ email: '', senha: '' }}
                    onSubmit={values => handleLogin(values)}
                    validationSchema={validationSchema}
                >
                    {({ 
                        handleChange,
                        values,
                        errors,
                        handleBlur,
                        touched,
                        handleSubmit 
                    }) => (
                        <Fragment>
                            <Label>E-mail</Label>
                            <FormInput
                                placeholder="Digite seu e-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                returnKeyType="next"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                style={touched.email && errors.email ?
                                    { borderBottomColor: 'red' }
                                    : { borderBottomColor: Colors.inputBorderBottom }} />

                            <ErrorMessage errorValue={touched.email && errors.email} />

                            <Label>Senha</Label>
                            <FormInput
                                placeholder="Digite sua senha"
                                secureTextEntry={true}
                                textContentType="password"
                                returnKeyType="send"
                                value={values.senha}
                                onChangeText={handleChange('senha')}
                                onBlur={handleBlur('senha')}
                                onSubmitEditing={handleSubmit}
                                style={touched.senha && errors.senha ?
                                    { borderBottomColor: 'red' }
                                    : { borderBottomColor: Colors.inputBorderBottom }}
                            />
                            <ErrorMessage errorValue={touched.senha && errors.senha} />

                            <DefaultButton
                                title="Entrar"
                                backgroundColor={Colors.bgBtnSuccess}
                                style={{ marginVertical: 20 }}
                                onPress={handleSubmit} />
                        </Fragment>
                    )}
                </Formik>

                <ButtonTransparent
                    title="Novo por aqui? Cadastre-se"
                    color={Colors.blueText}
                    onPress={() => props.navigation.navigate(navigateTo)}
                />
            </View>
        )
    };

    const changeUserType = () => {
        if (tipoUsuario === 'cliente') {
            setTipoUsuario('estabelecimento');
        }
        else {
            setTipoUsuario('cliente');
        }
    };

    const showLoginText = () => {
        return tipoUsuario === 'cliente'
            ? 'Entrar como Estabelecimento'
            : 'Entrar como Cliente'
    }

    return (
        <Background>
            <StatusBar barStyle="dark-content" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container style={styles.container}>
                    <View style={styles.logoImageContainer}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={styles.logoImage} />
                    </View>

                    <View style={styles.loginContainer}>
                        {renderLogin()}
                    </View>
                    <ButtonTransparent
                        title={showLoginText()}
                        titleSize={18}
                        color={Colors.purpleText}
                        style={styles.buttonChangeType}
                        onPress={changeUserType}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </Background>

    );
};

const styles = StyleSheet.create({
    container: {
        //justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    loginContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginHorizontal: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    logoImageContainer: {
        alignItems: 'center',
        marginBottom: 15
    },
    logoImage: {
        height: 150,
        width: 150
    },
    loginTitle: {
        textAlign: 'center',
        fontSize: 32,
        color: Colors.blueText
    },
    buttonChangeType: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        padding: 12,
    },
});

export default LoginScreen;