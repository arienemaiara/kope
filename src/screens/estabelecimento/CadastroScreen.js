import React, { Fragment, useRef, createRef, useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { View, Alert, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

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
import EnderecoList from '../../components/estabelecimento/EnderecoList';
import * as EstabelecimentoService from '../../services/estabelecimento';
import AuthContext from '../../contexts/auth';

import { validationShapeCadastro } from '../../utils/validationShape';

const CadastroScreen = props => {

    const [carregando, setCarregando] = useState(false);
    const [initialValues, setInitialValues] = useState({
        cpf_cnpj: '',
        nome: '',
        email: '',
        telefone: '',
        password: '',
        confirmPassword: '',
        enderecos: [{
            endereco: '',
            numero: '',
            complemento: '',
            cep: '',
            bairro: '',
            cidade: '',
            estado: ''
        }]
    });
    const [mascaraCpfCnpj, setMascaraCpfCnpj] = useState('cpf');

    const { signIn } = useContext(AuthContext);
    const estabelecimento = props.route?.params?.estabelecimento;
    const editMode = estabelecimento ? true : false;
    const formRef = useRef();
    const enderecoListRef = useRef();
    let cpfInputRef;
    let telefoneInputRef;

    let validationShape = validationShapeCadastro(editMode);
    if (editMode === false) {
        validationShape = {
            ...validationShape,
            cpf_cnpj: Yup.string()
                .required('Informe o CPF ou CNPJ')
                .test('cpf-valido', 'Informe um CPF ou CNPJ válido', (val) => {
                    return cpfInputRef.isValid();
                }),
        }
    }
    const validationSchema = Yup.object().shape(validationShape);

    useEffect(() => {
        if (editMode === true) {
            setCarregando(true);
            EstabelecimentoService.detalhe()
                .then((response) => {
                    verificarMascaraCpfCnpj(response.data.cpf_cnpj);
                    setInitialValues(response.data);
                })
                .catch((error) => {
                    Alert.alert('Erro', 'Erro ao buscar os dados cadastrados');
                })
                .finally(() => {
                    setCarregando(false);
                })
        }
    }, []);

    const verificarMascaraCpfCnpj = (cpf_cnpj) => {
        const len = cpf_cnpj ? cpf_cnpj.length : cpfInputRef.getRawValue().length;
        if (len < 11) {
            setMascaraCpfCnpj('cpf');
        }
        else {
            setMascaraCpfCnpj('cnpj');
        }
    }

    const onSaveButtonPressed = () => {
        if (formRef.current && enderecoListRef.current) {
            formRef.current.handleSubmit();
            enderecoListRef.current.handleSubmit();
        }
    }

    const handleSave = (values) => {
        if (enderecoListRef.current.isValid) {
            setCarregando(true);
            let formData = values;
            formData.cpf_cnpj = cpfInputRef.getRawValue();
            formData.telefone = telefoneInputRef.getRawValue();
            let { enderecos } = enderecoListRef.current.values;
            formData.enderecos = enderecos;
            console.tron.log(formData);
            if (editMode === false) {
                cadastrarEstabelecimento(formData);
            }
            else {
                editarEstabelecimento(formData);
            }
        }
    }

    const cadastrarEstabelecimento = (formData) => {
        EstabelecimentoService.cadastrar(formData)
            .then((response) => {
                setCarregando(false);
                signIn('estabelecimento', formData.email, formData.password)
            })
            .catch((error) => {
                setCarregando(false);
                const errorData = error.response.data;
                if (error.response.status === 500) {
                    Alert.alert('Erro', 'Erro interno do servidor')
                }
                else if (errorData.messages) {
                    Alert.alert('Erro', errorData.messages)
                }
            })
    }

    const editarEstabelecimento = (formData) => {
        EstabelecimentoService.atualizar(formData)
            .then((response) => {
                Alert.alert(
                    'Sucesso',
                    'Dados atualizados',
                    [{
                        text: 'OK',
                        onPress: () => {
                            props.navigation.goBack();
                            setCarregando(false);
                        } 
                    }]);
            })
            .catch((error) => {
                const errorData = error.response.data;
                if (error.response.status === 500) {
                    Alert.alert('Erro', 'Erro interno do servidor', [{
                        text: 'OK',
                        onPress: () => setCarregando(false) 
                    }])
                }
                else if (errorData.messages) {
                    Alert.alert('Erro', errorData.messages, [{
                        text: 'OK',
                        onPress: () => setCarregando(false) 
                    }]);
                }
            })
    }

    return (
        <Container>
            <Page
                title={editMode ? 'Editar dados pessoais' : 'Cadastre seu Estabelecimento'}
                headerBackButton={
                    <HeaderButton
                        iconName='arrow-left'
                        onPress={() => props.navigation.goBack()} />
                }
                headerRightButton={
                    <HeaderButton iconName='save' onPress={onSaveButtonPressed} />
                }>

                <Spinner visible={carregando} />

                <View style={styles.container}>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
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
                                        <Label>CPF/CNPJ</Label>
                                        <MaskedInput
                                            type={mascaraCpfCnpj}
                                            placeholder="Digite seu CPF ou CNPJ"
                                            keyboardType="numeric"
                                            returnKeyType="next"
                                            value={values.cpf_cnpj}
                                            onChange={() => verificarMascaraCpfCnpj()}
                                            onChangeText={handleChange('cpf_cnpj')}
                                            onBlur={handleBlur('cpf_cnpj')}
                                            editable={!editMode}
                                            ref={(ref) => cpfInputRef = ref}
                                            style={touched.cpf_cnpj && errors.cpf_cnpj ?
                                                { borderBottomColor: 'red' }
                                                : { borderBottomColor: Colors.inputBorderBottom }} />

                                        <ErrorMessage errorValue={touched.cpf_cnpj && errors.cpf_cnpj} />
                                    </View>
                                    <View>
                                        <Label>Nome</Label>
                                        <FormInput
                                            placeholder="Digite seu nome"
                                            autoCorrect={false}
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
                                            autoCapitalize="none"
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
                                        <Label>Telefone</Label>
                                        <MaskedInput
                                            type='cel-phone'
                                            placeholder="Digite seu telefone"
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
                                    {!editMode &&
                                        <>
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
                                        </>
                                    }
                                </Fragment>
                            )}
                    </Formik>
                </View>
                <View>
                    <EnderecoList
                        enderecos={initialValues.enderecos}
                        ref={enderecoListRef}
                    />
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