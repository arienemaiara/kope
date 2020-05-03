import React, { Fragment, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { View, Text, StyleSheet } from 'react-native';

import Page from '../../../components/Page';
import HeaderButton from '../../../components/header/HeaderButton';
import ErrorMessage from '../../../components/ErrorMessage';
import Colors from '../../../constants/Colors';
import { Container, Label, FormInput } from '../../../components/StyledComponents';

import * as RecompensasService from '../../../services/recompensas';

import RecompensaContext from '../../../contexts/recompensa';

const RecompensasCadastroScreen = props => {

    const { adicionarRecompensa, alterarRecompensa } = useContext(RecompensaContext);

    const formRef = useRef();

    const item = props.route?.params?.item;
    const title = item ? 'Editar Recompensa' : 'Cadastrar Recompensa';
    const editMode = item ? true : false;

    const validationSchema = Yup.object().shape({
        descricao: Yup.string()
            .required('Informe a descrição'),
        qtd_pontos: Yup.number()
            .required('Informe a quantidade de pontos')
    });

    const initialValues = {
        descricao: item?.descricao || '',
        qtd_pontos: item?.qtd_pontos.toString() || ''
    };

    const onBackHandler = () => {
        props.navigation.goBack();
    };

    const handleSave = (values) => {
        if (editMode === false) {
            adicionarRecompensa(values)
                .then(() => {
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.tron.log(error);
                });
        }
        else {
            alterarRecompensa(item.id, values)
                .then(() => {
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.tron.log(error);
                });
        }
    };

    return (
        <Container>
            <Page
                title={title}
                headerBackButton={
                    <HeaderButton iconName='arrow-left' onPress={onBackHandler} />
                }
                headerRightButton={
                    <HeaderButton iconName='save' onPress={() => formRef.current.handleSubmit()} />
                }>
                <View style={styles.container}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleSave(values)}
                        validationSchema={validationSchema}
                        style={styles.container}
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
                                        <Label>Descrição</Label>
                                        <FormInput
                                            placeholder="Descrição da recompensa"
                                            returnKeyType="next"
                                            value={values.descricao}
                                            onChangeText={handleChange('descricao')}
                                            onBlur={handleBlur('descricao')}
                                            style={touched.descricao && errors.descricao ?
                                                { borderBottomColor: 'red' }
                                                : { borderBottomColor: Colors.inputBorderBottom }}
                                        />
                                        <ErrorMessage errorValue={touched.descricao && errors.descricao} />
                                    </View>
                                    <View>
                                        <Label>Quantidade de pontos</Label>
                                        <FormInput
                                            placeholder="Quantidade de pontos para resgate"
                                            keyboardType="numeric"
                                            value={values.qtd_pontos}
                                            onChangeText={handleChange('qtd_pontos')}
                                            onBlur={handleBlur('qtd_pontos')}
                                            style={touched.qtd_pontos && errors.qtd_pontos ?
                                                { borderBottomColor: 'red' }
                                                : { borderBottomColor: Colors.inputBorderBottom }}
                                        />
                                        <ErrorMessage errorValue={touched.qtd_pontos && errors.qtd_pontos} />
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
        padding: 20
    }
});

export default RecompensasCadastroScreen;