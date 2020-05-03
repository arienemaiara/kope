import React, { Fragment, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { View, Alert, StyleSheet } from 'react-native';

import Page from '../../components/Page';
import HeaderButton from '../../components/header/HeaderButton';
import ErrorMessage from '../../components/ErrorMessage';
import {
    Container,
    Label,
    MaskedInput,
    FormInput
} from '../../components/StyledComponents';
import Colors from '../../constants/Colors';

import * as ClienteService from '../../services/cliente';
import AuthContext from '../../contexts/auth';

const CadastroScreen = props => {

    const { signIn } = useContext(AuthContext);

    let initialValues = {
        cpf: '',
        nome: '',
        email: '',
        telefone: '',
        password: '',
        confirmPassword: ''
    }

    const formRef = useRef();

    let cpfInputRef;
    let telefoneInputRef;

    const validationSchema = Yup.object().shape({
        cpf: Yup.string()
            .required('Informe o CPF')
            .test('cpf-valido', 'Informe um CPF válido', (val) => {
                return cpfInputRef.isValid();
            }),
        nome: Yup.string()
            .required('Informe o nome completo')
            .min(6, 'O nome deve ter no mínimo 6 caracteres'),
        email: Yup.string()
            .required('Informe o e-mail')
            .email('Informe um e-mail válido'),
        telefone: Yup.string()
            .required('Informe o celular'),
        password: Yup.string()
            .required('Informe a senha')
            .min(6, 'A senha deve ter no mínimo 6 caracteres'),
        confirmPassword: Yup.string()
            .required('Informe a confirmação de senha')
            .oneOf([Yup.ref('password'), null], 'Confirmação e senha devem ser iguais')
    });

    const onSaveButtonPressed = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    }

    const handleSave = (values) => {
        const formData = values;
        formData.cpf = cpfInputRef.getRawValue();
        formData.telefone = telefoneInputRef.getRawValue();
        delete formData.confirmPassword;

        ClienteService.cadastrar(formData)
            .then((response) => {
                signIn('cliente', formData.cpf, formData.password)
            })
            .catch((error) => {
                console.tron.log(error.response);
                const errorData = error.response.data;
                if (error.response.status === 500) {
                    Alert.alert('Erro', 'Erro interno do servidor')
                }
                else if (errorData.messages) {
                    Alert.alert('Erro', errorData.messages)
                }
            });
    };

    return (
        <Container>
            <Page
                title="Cadastre-se"
                headerBackButton={
                    <HeaderButton
                        iconName='arrow-left'
                        onPress={() => props.navigation.goBack()} />
                }
                headerRightButton={
                    <HeaderButton iconName='save' onPress={onSaveButtonPressed} />
                }>
                <View style={styles.container}>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleSave(values)}
                        validationSchema={validationSchema}
                        innerRef={formRef}
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
                                    <View>
                                        <Label>CPF</Label>
                                        <MaskedInput
                                            type="cpf"
                                            placeholder="Digite seu CPF"
                                            keyboardType="numeric"
                                            returnKeyType="next"
                                            value={values.cpf}
                                            onChangeText={handleChange('cpf')}
                                            onBlur={handleBlur('cpf')}
                                            ref={(ref) => cpfInputRef = ref}
                                            style={touched.cpf && errors.cpf ?
                                                { borderBottomColor: 'red' }
                                                : { borderBottomColor: Colors.inputBorderBottom }} />

                                        <ErrorMessage errorValue={touched.cpf && errors.cpf} />
                                    </View>
                                    <View>
                                        <Label>Nome Completo</Label>
                                        <FormInput
                                            placeholder="Digite seu nome"
                                            autoCorrect="false"
                                            returnKeyType="next"
                                            value={values.nome}
                                            onChangeText={handleChange('nome')}
                                            onBlur={handleBlur('nome')}
                                            style={touched.nome && errors.nome ?
                                                { borderBottomColor: 'red' }
                                                : { borderBottomColor: Colors.inputBorderBottom }}
                                        />
                                        <ErrorMessage errorValue={touched.nome && errors.nome} />
                                    </View>
                                    <View>
                                        <Label>E-mail</Label>
                                        <FormInput
                                            placeholder="Digite seu e-mail"
                                            autoCapitalize="false@gmai"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            style={touched.email && errors.email ?
                                                { borderBottomColor: 'red' }
                                                : { borderBottomColor: Colors.inputBorderBottom }}
                                        />
                                        <ErrorMessage errorValue={touched.email && errors.email} />
                                    </View>

                                    <View>
                                        <Label>Celular</Label>
                                        <MaskedInput
                                            type='cel-phone'
                                            placeholder="Digite seu celular"
                                            keyboardType="numeric"
                                            returnKeyType="next"
                                            value={values.telefone}
                                            onChangeText={handleChange('telefone')}
                                            onBlur={handleBlur('telefone')}
                                            ref={(ref) => telefoneInputRef = ref}
                                            style={touched.telefone && errors.telefone ?
                                                { borderBottomColor: 'red' }
                                                : { borderBottomColor: Colors.inputBorderBottom }} />

                                        <ErrorMessage errorValue={touched.telefone && errors.telefone} />
                                    </View>

                                    <View>
                                        <Label>Senha</Label>
                                        <FormInput
                                            placeholder="Digite sua senha"
                                            secureTextEntry={true}
                                            textContentType="password"
                                            returnKeyType="next"
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            style={touched.password && errors.password ?
                                                { borderBottomColor: 'red' }
                                                : { borderBottomColor: Colors.inputBorderBottom }}
                                        />
                                        <ErrorMessage errorValue={touched.password && errors.password} />
                                    </View>

                                    <View>
                                        <Label>Confirmar senha</Label>
                                        <FormInput
                                            placeholder="Confirme a senha"
                                            secureTextEntry={true}
                                            textContentType="password"
                                            returnKeyType="send"
                                            value={values.confirmPassword}
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                            onSubmitEditing={handleSubmit}
                                            style={touched.confirmPassword && errors.confirmPassword ?
                                                { borderBottomColor: 'red' }
                                                : { borderBottomColor: Colors.inputBorderBottom }}
                                        />
                                        <ErrorMessage errorValue={touched.confirmPassword && errors.confirmPassword} />
                                    </View>
                                </Fragment>
                            )}
                    </Formik>
                </View>
            </Page>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
});

export default CadastroScreen;