import React, { forwardRef, useRef } from 'react';
import * as Yup from 'yup';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Formik, Form, Field, FieldArray, getIn } from 'formik';
import {
    Container,
    Row,
    Column,
    Label,
    MaskedInput,
    FormInput,
    SubTitle
} from '../StyledComponents';
import IconButton from '../IconButton';
import ErrorMessage from '../ErrorMessage';
import Colors from '../../constants/Colors';

const EnderecoList = (props, ref) => {

    const initialValue = {
        endereco: '',
        numero: '',
        complemento: '',
        cep: '',
        bairro: '',
        cidade: '',
        estado: ''
    }

    const validationSchema = Yup.object().shape({
        enderecos: Yup.array()
            .of(
                Yup.object().shape({
                    endereco: Yup.string().required('Informe o logradouro'),
                    numero: Yup.string().required('Informe o número'),
                    cep: Yup.string().required('Informe o CEP'),
                    bairro: Yup.string().required('Informe o bairro'),
                    cidade: Yup.string().required('Informe a cidade'),
                    estado: Yup.string().required('Informe o estado'),
                })
                .nullable()
            )
            .required('Deve ser incluído pelo menos 1 endereço')
    });

    const handleSave = (values) => {
        console.tron.log('handleSave')
        console.tron.log(values)
    }

    const renderBorderColor = (errors, touched, name) => {
        const error = getIn(errors, name);
        const touch = getIn(touched, name);
        if (error && touch) {
            return { borderBottomColor: 'red' }
        }
        else {
            return { borderBottomColor: Colors.inputBorderBottom }
        }
    }

    const Validation = ({ name }) => (
        <Field
          name={name}>
          {({ form }) => {
            const error = getIn(form.errors, name);
            const touch = getIn(form.touched, name);
            return touch && error ? <ErrorMessage errorValue={error}/> : null;
          }}
        </Field>
    );

    return (
        <Formik
            initialValues={{ enderecos: props.enderecos }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={values => handleSave(values)}
            innerRef={ref}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                    <FieldArray
                        name="enderecos"
                        render={arrayHelpers => (
                            <View style={styles.enderecoContainer}>
                                {
                                    values.enderecos.map((endereco, index) => (
                                        <View style={styles.enderecoItem}>
                                            <SubTitle color={Colors.pinkText}>
                                                Endereço {index + 1}
                                            </SubTitle>
                                            <View>
                                                <Label>CEP</Label>
                                                <FormInput
                                                    placeholder="CEP"
                                                    autoCorrect={false}
                                                    returnKeyType="next"
                                                    value={values.enderecos[index].cep}
                                                    onChangeText={handleChange(`enderecos[${index}].cep`)}
                                                    onBlur={handleBlur(`enderecos[${index}].cep`)}
                                                    style={renderBorderColor(errors, touched, `enderecos[${index}].cep`)}
                                                />
                                                <Validation name={`enderecos[${index}].cep`} />
                                            </View>
                                            <View>
                                                <Label>Logradouro</Label>
                                                <FormInput
                                                    placeholder="Logradouro"
                                                    returnKeyType="next"
                                                    value={values.enderecos[index].endereco}
                                                    onChangeText={handleChange(`enderecos[${index}].endereco`)}
                                                    onBlur={handleBlur(`enderecos[${index}].endereco`)}
                                                    style={renderBorderColor(errors, touched, `enderecos[${index}].endereco`)}
                                                />
                                                <Validation name={`enderecos[${index}].endereco`} />
                                            </View>
                                            <Row style={{alignItems: 'flex-start'}}>
                                                <View style={{ flex: 1, marginRight: 15 }}>
                                                    <Label>Número</Label>
                                                    <FormInput
                                                        placeholder="Número"
                                                        returnKeyType="next"
                                                        value={values.enderecos[index].numero}
                                                        onChangeText={handleChange(`enderecos[${index}].numero`)}
                                                        onBlur={handleBlur(`enderecos[${index}].numero`)}
                                                        style={renderBorderColor(errors, touched, `enderecos[${index}].numero`)}
                                                    />
                                                    <Validation name={`enderecos[${index}].numero`} />
                                                </View>
                                                <View style={{ flex: 2 }}>
                                                    <Label>Complemento</Label>
                                                    <FormInput
                                                        placeholder="Complemento"
                                                        returnKeyType="next"
                                                        value={values.enderecos[index].complemento}
                                                        onChangeText={handleChange(`enderecos[${index}].complemento`)}
                                                        onBlur={handleBlur(`enderecos[${index}].complemento`)}
                                                    />
                                                </View>
                                            </Row>

                                            <View>
                                                <Label>Bairro</Label>
                                                <FormInput
                                                    placeholder="Bairro"
                                                    returnKeyType="next"
                                                    value={values.enderecos[index].bairro}
                                                    onChangeText={handleChange(`enderecos[${index}].bairro`)}
                                                    onBlur={handleBlur(`enderecos[${index}].bairro`)}
                                                    style={renderBorderColor(errors, touched, `enderecos[${index}].bairro`)}
                                                />
                                                <Validation name={`enderecos[${index}].bairro`} />
                                            </View>
                                            <Row style={{alignItems: 'flex-start'}}>
                                                <View style={{flex: 3, marginRight: 15}}>
                                                    <Label>Cidade</Label>
                                                    <FormInput
                                                        placeholder="Cidade"
                                                        returnKeyType="next"
                                                        value={values.enderecos[index].cidade}
                                                        onChangeText={handleChange(`enderecos[${index}].cidade`)}
                                                        onBlur={handleBlur(`enderecos[${index}].cidade`)}
                                                        style={renderBorderColor(errors, touched, `enderecos[${index}].cidade`)}
                                                    />
                                                    <Validation name={`enderecos[${index}].cidade`} />
                                                </View>
                                                <View style={{flex: 1}}>
                                                    <Label>Estado</Label>
                                                    <FormInput
                                                        placeholder="UF"
                                                        value={values.enderecos[index].estado}
                                                        onChangeText={handleChange(`enderecos[${index}].estado`)}
                                                        onBlur={handleBlur(`enderecos[${index}].estado`)}
                                                        style={renderBorderColor(errors, touched, `enderecos[${index}].estado`)}
                                                    />
                                                    <Validation name={`enderecos[${index}].estado`} />
                                                </View>
                                            </Row>
                                            <Row style={{ justifyContent: 'space-between' }}>
                                                <IconButton 
                                                    onPress={() => arrayHelpers.push(initialValue)}
                                                    iconName="plus-circle"
                                                    iconSize={24}
                                                    color={Colors.greenText}
                                                />
                                                {
                                                    index > 0 &&
                                                    <IconButton 
                                                        onPress={() => arrayHelpers.remove(index)}
                                                        iconName="trash-2"
                                                        iconSize={24}
                                                        color={Colors.redText}
                                                    />
                                                }
                                            </Row>
                                        </View>
                                    ))
                                }
                            </View>
                        )}
                    />
                )}
        </Formik>
    )
};

const styles = StyleSheet.create({
    enderecoContainer: {
        marginBottom: 20
    },
    enderecoItem: {
        borderTopWidth: 1,
        borderTopColor: Colors.listSeparator,
        paddingHorizontal: 20,
        paddingVertical: 10
    }
});

export default forwardRef(EnderecoList);