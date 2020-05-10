import * as Yup from 'yup';

export const validationShapeCadastro = (edit = false) => {
    let validationShape = {
        nome: Yup.string()
            .required('Informe o nome completo')
            .min(6, 'O nome deve ter no mínimo 6 caracteres'),
        email: Yup.string()
            .required('Informe o e-mail')
            .email('Informe um e-mail válido'),
        telefone: Yup.string()
            .required('Informe o celular'),
    }

    if (edit === false) {
        validationShape = {
            ...validationShape,
            password: Yup.string()
                .required('Informe a senha')
                .min(6, 'A senha deve ter no mínimo 6 caracteres'),
            confirmPassword: Yup.string()
                .required('Informe a confirmação de senha')
                .oneOf([Yup.ref('password'), null], 'Confirmação e senha devem ser iguais')
        }
    }

    return validationShape;
}