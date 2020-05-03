import React, { Fragment, forwardRef } from 'react';
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import * as Yup from 'yup';
import { Formik } from 'formik';

import {
    Container,
    Label,
    DefaultButton,
    MaskedInput,
    FormInput
} from '../StyledComponents';

import ErrorMessage from '../ErrorMessage';

const Form = ({ initialValues, onSubmit, validationSchema, formFields }, ref) => {

    console.tron.log('entrou form')

    let inputRefs = [];

    const renderFormField = ({ field, handleChange, values, errors, isValid, handleBlur, touched }) => {
        console.tron.log(values['cpf']);
        
            console.tron.log(field);
            return (
                <View>
                    <Label>{field.label}</Label>
                    { field.maskedInput === true
                        ? 
                        <MaskedInput
                            type={field.maskedType}
                            placeholder={field.placeholder}
                            keyboardType={field.keyboardType}
                            returnKeyType={field.returnKeyType}
                            value={values.cpf}
                            onChangeText={handleChange('cpf')}
                            onBlur={handleBlur('cpf')}
                        />
                        :
                        <Text>oi</Text>
    
                    }
                    <ErrorMessage errorValue={touched.cpf && errors.cpf} /> 
                </View>
            )
       
        
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => onSubmit(values)}
            validationSchema={validationSchema}
            innerRef={ref}
        >
            {({
                handleChange,
                values,
                errors,
                isValid,
                handleBlur,
                touched,
                handleSubmit
            }) => (
                    <Fragment>
                        {
                            formFields.map((field) => 
                                renderFormField({ field, handleChange, values, errors, isValid, handleBlur, touched })
                            )
                        }
                    </Fragment>
                )}

        </Formik>
    )

};

Form.propTypes = {
    initialValues: PropTypes.object.isRequired,
    formFields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    validationSchema: PropTypes.object.isRequired,
}

export default forwardRef(Form);