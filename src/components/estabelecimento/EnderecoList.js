import React, { forwardRef, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Formik, Form, FieldArray } from 'formik';

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
import Colors from '../../constants/Colors';

const EnderecoList = (props, ref) => {

    console.tron.log(props.enderecos);

    return (
        <Formik
            initialValues={{ enderecos: props.enderecos }}
            enableReinitialize={true}
            innerRef={ref}>
            {({
                values,
                handleChange,
                handleBlur,
                touched
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
                                                />
                                            </View>
                                            <View>
                                                <Label>Logradouro</Label>
                                                <FormInput
                                                    placeholder="Logradouro"
                                                    returnKeyType="next"
                                                    value={values.enderecos[index].endereco}
                                                    onChangeText={handleChange(`enderecos[${index}].endereco`)}
                                                    onBlur={handleBlur(`enderecos[${index}].endereco`)}
                                                />
                                            </View>
                                            <Row>
                                                <View style={{ flex: 1, marginRight: 15 }}>
                                                    <Label>Número</Label>
                                                    <FormInput
                                                        placeholder="Número"
                                                        returnKeyType="next"
                                                        value={values.enderecos[index].numero}
                                                        onChangeText={handleChange(`enderecos[${index}].numero`)}
                                                        onBlur={handleBlur(`enderecos[${index}].numero`)}
                                                    />
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
                                                />
                                            </View>
                                            <Row>
                                                <View style={{flex: 3, marginRight: 15}}>
                                                    <Label>Cidade</Label>
                                                    <FormInput
                                                        placeholder="Cidade"
                                                        returnKeyType="next"
                                                        value={values.enderecos[index].cidade}
                                                        onChangeText={handleChange(`enderecos[${index}].cidade`)}
                                                        onBlur={handleBlur(`enderecos[${index}].cidade`)}
                                                    />
                                                </View>
                                                <View style={{flex: 1}}>
                                                    <Label>Estado</Label>
                                                    <FormInput
                                                        placeholder="UF"
                                                        value={values.enderecos[index].estado}
                                                        onChangeText={handleChange(`enderecos[${index}].estado`)}
                                                        onBlur={handleBlur(`enderecos[${index}].estado`)}
                                                    />
                                                </View>
                                            </Row>
                                            <Row style={{ justifyContent: 'space-between' }}>
                                                <IconButton 
                                                    onPress={() => arrayHelpers.push(index, {})}
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